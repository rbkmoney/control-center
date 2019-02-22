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

interface MetaSource {
    namespace: string;
    shallowDefenition: MetaGroup[];
    used: MetaTypeDefined[];
}

const isMetaUsed = (meta: string, usedMeta: MetaTypeDefined[]) =>
    !!usedMeta.find(i => i.name === meta);

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

const enrichWithCircularProtection = (type: string, source: MetaSource): MetaTyped | string =>
    isMetaUsed(type, source.used)
        ? `$circular_${type}`
        : enrich(getCondition(type, source.namespace), source);

const enrichObject = (meta: MetaTyped & MetaObject, source: MetaSource) => ({
    ...meta,
    fields: enrichFields(meta.fields, source)
});

function enrichCollection(meta: MetaTyped & MetaCollection, source: MetaSource) {
    if (!isNeedEnrichment(meta.itemMeta)) {
        return meta;
    }
    const type = meta.itemMeta as string;
    return {
        ...meta,
        itemMeta: enrichWithCircularProtection(type, source)
    };
}

function enrichMap(meta: MetaTyped & MetaMap, source: MetaSource) {
    let keyMeta = meta.keyMeta;
    if (isNeedEnrichment(keyMeta)) {
        keyMeta = enrichWithCircularProtection(meta.keyMeta as string, source);
    }
    let valueMeta = meta.valueMeta;
    if (isNeedEnrichment(valueMeta)) {
        valueMeta = enrichWithCircularProtection(meta.valueMeta as string, source);
    }
    return {
        ...meta,
        keyMeta,
        valueMeta
    };
}

function enrichTyped(meta: MetaTyped, source: MetaSource): MetaTyped | string {
    let result = meta;
    switch (meta.type) {
        case MetaType.struct:
        case MetaType.union:
            result = enrichObject(meta as MetaTyped & MetaObject, source);
            break;
        case MetaType.collection:
            result = enrichCollection(meta as MetaCollection, source);
            break;
        case MetaType.map:
            result = enrichMap(meta as MetaMap, source);
            break;
        case MetaType.typedef:
            result = enrichVariableMetaType((meta as MetaTypedef).meta, source) as any; // TODO fix any
            break;
    }
    return result;
}

function registerUsedMeta(meta: MetaTyped, used: MetaTypeDefined[]): MetaTypeDefined[] {
    switch (meta.type) {
        case MetaType.struct:
        case MetaType.union:
            return [...used, meta as MetaTyped & MetaTypeDefined];
    }
    return used;
}

function enrich(condition: MetaTypeCondition, source: MetaSource): MetaTyped | string {
    const meta = findMeta<MetaTyped & MetaTypeDefined>(condition, source.shallowDefenition);
    const enriched = enrichTyped(meta, {
        ...source,
        used: registerUsedMeta(meta, source.used)
    });
    return enriched;
}

function enrichVariableMetaType(meta: MetaTyped | string, source: MetaSource): MetaTyped | string {
    if (isNeedEnrichment(meta)) {
        return enrichWithCircularProtection(meta as string, source);
    }
    return enrichTyped(meta as MetaTyped, source);
}

const enrichField = (field: MetaField, source: MetaSource): MetaField => ({
    ...field,
    meta: enrichVariableMetaType(field.meta, source)
});

const enrichFields = (fields: MetaField[], source: MetaSource): MetaField[] =>
    fields.map(f => enrichField(f, source));

export function enrichMeta(
    target: MetaStruct | MetaUnion,
    namespace: string,
    shallowDefenition: MetaGroup[]
): MetaStruct | MetaUnion {
    if (!target || !namespace || !shallowDefenition) {
        return null;
    }
    return {
        ...target,
        fields: enrichFields(target.fields, { namespace, shallowDefenition, used: [] })
    };
}
