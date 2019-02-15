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
    MetaUnion
} from '../model';
import { MetaTypeCondition, MetaGroup } from './model';
import { findMeta } from './find-meta';
import { isPrimitiveType } from './utils';

const isNeedEnrichment = (meta: any) => {
    console.log(meta);
    return isString(meta) && !isPrimitiveType(meta);
};

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

const enrichMetaObjectField = (
    meta: MetaTyped & MetaObject,
    namespace: string,
    source: MetaGroup[]
) => ({
    ...meta,
    fields: enrichFields(meta.fields, namespace, source)
});

const enrichMetaCollectionField = (
    meta: MetaTyped & MetaCollection,
    namespace: string,
    source: MetaGroup[]
) => {
    if (!isNeedEnrichment(meta.itemMeta)) {
        return meta;
    }
    const type = meta.itemMeta as string;
    return {
        ...meta,
        itemMeta: enrichFieldMeta({ namespace, type }, source)
    };
};

const enrichMetaMapField = (meta: MetaTyped & MetaMap, namespace: string, source: MetaGroup[]) => {
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
};

function enrichByType(type: MetaType, meta: MetaTyped, namespace: string, source: MetaGroup[]) {
    switch (type) {
        case MetaType.struct:
        case MetaType.union:
            return enrichMetaObjectField(meta as MetaTyped & MetaObject, namespace, source);
        case MetaType.collection:
            return enrichMetaCollectionField(meta as MetaCollection, namespace, source);
        case MetaType.map:
            return enrichMetaMapField(meta as MetaMap, namespace, source);
        case MetaType.typedef:
            return enrichMetaTypedefField(meta as MetaTypedef, namespace, source);
    }
    return meta;
}

const enrichMetaTypedefField = (
    { meta }: MetaTyped & MetaTypedef,
    namespace: string,
    source: MetaGroup[]
) => {
    if (isNeedEnrichment(meta)) {
        const condition = getCondition(meta as string, namespace);
        return enrichFieldMeta(condition, source);
    }
    const type = (meta as MetaTyped).type;
    return enrichByType(type, meta as any, namespace, source);
};

const enrichFieldMeta = (condition: MetaTypeCondition, source: MetaGroup[]) => {
    const meta = findMeta<MetaTyped>(condition, source);
    return enrichByType(meta.type, meta, condition.namespace, source);
};

function enrichField(field: MetaField, namespace: string, source: MetaGroup[]): MetaField {
    if (!isNeedEnrichment(field.meta)) { // TODO fix it
        return field;
    }
    const metaType = field.meta as string; // field.meta is string after isNeedEnrichment check
    const condition = getCondition(metaType, namespace);
    return {
        ...field,
        meta: enrichFieldMeta(condition, source)
    };
}

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
