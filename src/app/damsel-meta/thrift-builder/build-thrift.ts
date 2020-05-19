import { getThriftInstance } from '../../thrift-services';
import {
    MetaCollection,
    MetaEnum,
    MetaMap,
    MetaPrimitive,
    MetaStruct,
    MetaType,
    MetaTyped,
    MetaUnion,
} from '../model';

export type ThriftType = any;

const buildPrimitive = ({ value }: MetaPrimitive): string | number | boolean => value;

const buildEnum = ({ value }: MetaEnum): number => value;

const buildCollection = ({ value }: MetaCollection): ThriftType[] => {
    if (!value) {
        return;
    }
    return value.map(buildTyped);
};

function buildMap({ value }: MetaMap): Map<ThriftType, ThriftType> {
    if (!value) {
        return;
    }
    const result = new Map();
    value.forEach((v, k) => result.set(buildTyped(k), buildTyped(v)));
    return result;
}

function buildTyped(meta: MetaTyped): ThriftType {
    switch (meta.type) {
        case MetaType.struct:
        case MetaType.union:
            return buildStructUnion(meta as MetaStruct);
        case MetaType.primitive:
            return buildPrimitive(meta as MetaPrimitive);
        case MetaType.enum:
            return buildEnum(meta as MetaEnum);
        case MetaType.collection:
            return buildCollection(meta as MetaCollection);
        case MetaType.map:
            return buildMap(meta as MetaMap);
    }
    throw new Error(`Unsupported meta type: ${meta.type}`);
}

export function buildStructUnion({
    namespace,
    name,
    fields,
    virgin,
}: MetaStruct | MetaUnion): ThriftType {
    if (virgin) {
        return;
    }
    const instance = getThriftInstance(namespace, name);
    for (const field of fields) {
        instance[field.name] = buildTyped(field.meta as MetaTyped);
    }
    return instance;
}
