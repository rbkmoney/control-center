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

interface ResolveSource {
    сircularSign: string;
    resolveContainer: (MetaUnion | MetaStruct)[];
}

function isCircular(meta: MetaTyped | string, source: ResolveSource) {
    if (isString(meta) && meta.startsWith(source.сircularSign)) {
        return true;
    }
}

function resolveObject(
    meta: MetaUnion | MetaStruct,
    source: ResolveSource
): MetaUnion | MetaStruct {
    const found = source.resolveContainer.find(c => c.name === meta.name);
    if (found) {
        // console.log('maybe', found);
    } else {
        source.resolveContainer.push(meta);
    }

    return {
        ...meta,
        fields: resolveFields(meta.fields, source)
    };
}

function resolveMap(meta: MetaMap, source: ResolveSource): MetaMap {
    return {
        ...meta,
        keyMeta: resolveMeta(meta.keyMeta, source),
        valueMeta: resolveMeta(meta.valueMeta, source)
    };
}

function resolveCollection(meta: MetaCollection, source: ResolveSource): MetaCollection {
    return {
        ...meta,
        itemMeta: resolveMeta(meta.itemMeta, source)
    };
}

function resolveMeta(meta: MetaTyped | string, source: ResolveSource): any {
    if (isCircular(meta, source)) {
        const found = source.resolveContainer.find(
            c => c.name === (meta as string).replace(source.сircularSign, '')
        );
        return found;
    }
    const metaTyped = meta as MetaTyped;
    switch (metaTyped.type) {
        case MetaType.struct:
        case MetaType.union:
            return resolveObject(meta as MetaUnion, source);
        case MetaType.collection:
            return resolveCollection(meta as MetaCollection, source);
        case MetaType.map:
            return resolveMap(meta as MetaMap, source);
        case MetaType.typedef:
            console.log('unexpected typedef', meta);
            return meta;
        case MetaType.primitive:
        case MetaType.enum:
            return meta;
    }
}

const resolveFields = (fields: MetaField[], source: ResolveSource) =>
    fields.map(f => resolveMeta(f.meta, source));



function resolveRefs(resolveContainer: (MetaUnion | MetaStruct)[]) {
    resolveContainer.forEach(item => {
        item.fields.forEach(field => {
        })
    });
}

export const resolveCircularMeta = (
    meta: MetaStruct | MetaUnion,
    сircularSign: string
): MetaStruct | MetaUnion => {
    const resolveContainer = [];
    const result = resolveObject(meta, { resolveContainer, сircularSign });
    // resolveContainer[7].fields[2].meta = resolveContainer[7];
    // console.log(resolveContainer);
    return result;
};
