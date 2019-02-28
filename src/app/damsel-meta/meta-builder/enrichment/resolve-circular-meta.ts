import isString from 'lodash-es/isString';

import {
    MetaStruct,
    MetaUnion,
    MetaField,
    MetaTyped,
    MetaType,
    MetaMap,
    MetaCollection
} from '../../model';

let container;
const resolvedContainer = [];

const isCircular = (meta: MetaTyped | string, сircularSign: string) =>
    isString(meta) && meta.startsWith(сircularSign);

function resolveObject(meta: MetaUnion | MetaStruct, сircularSign: string): void {
    const found = resolvedContainer.find(i => i.name === meta.name);
    if (found) {
        return;
    }
    resolveFields(meta.fields, сircularSign);
}

function resolveMap(meta: MetaMap, сircularSign: string): void {
    meta.keyMeta = resolveMeta(meta.keyMeta, сircularSign);
    meta.valueMeta = resolveMeta(meta.valueMeta, сircularSign);
}

function resolveCollection(meta: MetaCollection, сircularSign: string): void {
    meta.itemMeta = resolveMeta(meta.itemMeta, сircularSign);
}

function resolveMeta(meta: MetaTyped | string, сircularSign: string) {
    if (isCircular(meta, сircularSign)) {
        const found = container.find(i => i.name === (meta as string).replace(сircularSign, ''));
        resolvedContainer.push(found);
        return found;
    }
    let result = meta;
    const metaTyped = meta as MetaTyped;
    switch (metaTyped.type) {
        case MetaType.struct:
        case MetaType.union:
            resolveObject(meta as MetaUnion, сircularSign);
            break;
        case MetaType.collection:
            resolveCollection(meta as MetaCollection, сircularSign);
            break;
        case MetaType.map:
            resolveMap(meta as MetaMap, сircularSign);
            break;
        case MetaType.typedef:
            console.log('unexpected typedef', meta);
            break;
        case MetaType.primitive:
        case MetaType.enum:
            break;
    }
    return result;
}

function resolveFields(fields: MetaField[], сircularSign: string) {
    for (const field of fields) {
        field.meta = resolveMeta(field.meta, сircularSign);
    }
}

export const resolveCircularMeta = (
    resolveContainer: (MetaStruct | MetaUnion)[],
    сircularSign: string
): void => {
    container = resolveContainer;
    for (const item of resolveContainer) {
        resolveFields(item.fields, сircularSign);
    }
};
