import isString from 'lodash-es/isString';

import {
    MetaTyped,
    MetaObject,
    MetaCollection,
    MetaMap,
    MetaTypedef,
    MetaType,
    MetaField,
    MetaStruct,
    MetaUnion,
    MetaTypeDefined
} from '../model';
import { MetaTypeCondition, MetaGroup } from './model';
import { findMeta } from './find-meta';
import { isPrimitiveType } from './utils';

const isNeedEnrichment = (meta: any) => isString(meta) && !isPrimitiveType(meta);

function getCondition(meta: string, defaultNamespace: string): MetaTypeCondition {
    const [first, second] = meta.split('.');
    return second
        ? {
              namespace: first,
              type: second
          }
        : {
              namespace: defaultNamespace,
              type: first
          };
}

const enrichObject = (meta: MetaTyped & MetaObject, namespace: string, source: MetaGroup[]) => ({
    ...meta,
    fields: enrichFields(meta.fields, namespace, source)
});

function enrichCollection(
    meta: MetaTyped & MetaCollection,
    namespace: string,
    source: MetaGroup[]
) {
    if (!isNeedEnrichment(meta.itemMeta)) {
        return meta;
    }
    const type = meta.itemMeta as string;
    return {
        ...meta,
        itemMeta: enrichFieldMeta({ namespace, type }, source)
    };
}

function enrichMap(meta: MetaTyped & MetaMap, namespace: string, source: MetaGroup[]) {
    let keyMeta = meta.keyMeta;
    if (isNeedEnrichment(keyMeta)) {
        const keyType = meta.keyMeta as string;
        keyMeta = enrichFieldMeta({ namespace, type: keyType }, source);
    }
    let valueMeta = meta.valueMeta;
    if (isNeedEnrichment(valueMeta)) {
        const valueType = meta.valueMeta as string;
        valueMeta = enrichFieldMeta({ namespace, type: valueType }, source);
    }
    return {
        ...meta,
        keyMeta,
        valueMeta
    };
}

function enrichByType(type: MetaType, meta: MetaTyped, namespace: string, source: MetaGroup[]) {
    switch (type) {
        case MetaType.struct:
        case MetaType.union:
            return enrichObject(meta as MetaTyped & MetaObject, namespace, source);
        case MetaType.collection:
            return enrichCollection(meta as MetaCollection, namespace, source);
        case MetaType.map:
            return enrichMap(meta as MetaMap, namespace, source);
        case MetaType.typedef:
            return enrichType((meta as MetaTypedef).meta, namespace, source);
    }
    return meta;
}

function enrichType(
    meta: MetaTyped | MetaObject | MetaTypeDefined | string,
    namespace: string,
    source: MetaGroup[]
) {
    if (isNeedEnrichment(meta)) {
        const condition = getCondition(meta as string, namespace);
        return enrichFieldMeta(condition, source);
    }
    const type = (meta as MetaTyped).type;
    return enrichByType(type, meta as any, namespace, source);
}

function enrichFieldMeta(condition: MetaTypeCondition, source: MetaGroup[]) {
    const meta = findMeta<MetaTyped>(condition, source);
    return enrichByType(meta.type, meta, condition.namespace, source);
}

const enrichField = (field: MetaField, namespace: string, source: MetaGroup[]): MetaField => ({
    ...field,
    meta: enrichType(field.meta, namespace, source)
});

const enrichFields = (fields: MetaField[], namespace: string, source: MetaGroup[]): MetaField[] =>
    fields.map(f => enrichField(f, namespace, source));

export function enrichMeta(
    target: MetaStruct | MetaUnion,
    namespace: string,
    source: MetaGroup[]
): MetaStruct | MetaUnion {
    if (!target || !namespace || !source) {
        return null;
    }
    return {
        ...target,
        fields: enrichFields(target.fields, namespace, source)
    };
}
