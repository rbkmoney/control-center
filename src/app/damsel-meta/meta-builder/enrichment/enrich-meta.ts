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
} from '../../model';
import { MetaTypeCondition, MetaGroup } from '../model';
import { findMeta } from '../find-meta';
import { isPrimitiveType } from '../utils';
import { resolveCircularMeta } from './resolve-circular-meta';

interface MetaSource {
    namespace: string;
    shallowDefenition: MetaGroup[];
    used: MetaTypeDefined[];
}

const resolveRefContainer = [];
function pushToContainer(item: MetaStruct | MetaUnion) {
    const found = resolveRefContainer.find(i => i.name === item.name);
    if (!found) {
        resolveRefContainer.push(item);
    }
}

const isMetaUsed = (meta: string, usedMeta: MetaTypeDefined[]) =>
    !!usedMeta.find(i => i.name === meta);

const isObjectRefType = (meta: any) => isString(meta) && !isPrimitiveType(meta);

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

const enrichObject = (meta: MetaTyped & MetaObject, source: MetaSource): MetaTyped & MetaObject => {
    const result = {
        ...meta,
        fields: enrichFields(meta.fields, source)
    };
    pushToContainer(result as MetaStruct | MetaUnion);
    return result;
};

function enrichCollection(meta: MetaTyped & MetaCollection, source: MetaSource): MetaCollection {
    let itemMeta = meta.itemMeta;
    if (isObjectRefType(itemMeta)) {
        itemMeta = enrichObjectRefWithCircularProtection(itemMeta as string, source);
    }
    return {
        ...meta,
        itemMeta
    };
}

function enrichMap(meta: MetaTyped & MetaMap, source: MetaSource): MetaMap {
    let keyMeta = meta.keyMeta;
    if (isObjectRefType(keyMeta)) {
        keyMeta = enrichObjectRefWithCircularProtection(meta.keyMeta as string, source);
    }
    let valueMeta = meta.valueMeta;
    if (isObjectRefType(valueMeta)) {
        valueMeta = enrichObjectRefWithCircularProtection(meta.valueMeta as string, source);
    }
    return {
        ...meta,
        keyMeta,
        valueMeta
    };
}

function enrichTyped(meta: MetaTyped, source: MetaSource): MetaTyped | string {
    switch (meta.type) {
        case MetaType.struct:
        case MetaType.union:
            return enrichObject(meta as MetaTyped & MetaObject, source);
        case MetaType.collection:
            return enrichCollection(meta as MetaCollection, source);
        case MetaType.map:
            return enrichMap(meta as MetaMap, source);
        case MetaType.typedef:
            return enrichUndeterminedMetaType((meta as MetaTypedef).meta, source) as MetaTyped;
        case MetaType.primitive:
        case MetaType.enum:
            return meta;
    }
    throw new Error(`Unexpected MetaType: ${meta.type}`);
}

function registerUsedMeta(meta: MetaTyped, used: MetaTypeDefined[]): MetaTypeDefined[] {
    switch (meta.type) {
        case MetaType.struct:
        case MetaType.union:
            return [...used, meta as MetaTyped & MetaTypeDefined];
    }
    return used;
}

function enrichObjectRef(condition: MetaTypeCondition, source: MetaSource): MetaTyped | string {
    const meta = findMeta<MetaTyped>(condition, source.shallowDefenition);
    if (meta === null) {
        throw new Error(
            `Meta not found. Condition namespace: ${condition.namespace}; type: ${condition.type}`
        );
    }
    const used = registerUsedMeta(meta, source.used);
    return enrichTyped(meta, {
        ...source,
        used
    });
}

const enrichObjectRefWithCircularProtection = (
    type: string,
    source: MetaSource
): MetaTyped | string =>
    isMetaUsed(type, source.used)
        ? `$circular_${type}`
        : enrichObjectRef(getCondition(type, source.namespace), source);

function enrichUndeterminedMetaType(
    meta: MetaTyped | string,
    source: MetaSource
): MetaTyped | string {
    if (isObjectRefType(meta)) {
        return enrichObjectRefWithCircularProtection(meta as string, source);
    }
    return enrichTyped(meta as MetaTyped, source);
}

const enrichField = (field: MetaField, source: MetaSource): MetaField => ({
    ...field,
    meta: enrichUndeterminedMetaType(field.meta, source)
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
    const enriched = {
        ...target,
        fields: enrichFields(target.fields, { namespace, shallowDefenition, used: [target] })
    };
    pushToContainer(enriched);
    resolveCircularMeta(resolveRefContainer, '$circular_');
    return enriched;
}
