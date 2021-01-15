import isNil from 'lodash-es/isNil';
import type { Int64, ValueType } from 'thrift-ts';

import {
    isComplexType,
    isPrimitiveType,
    parseNamespaceType,
    StructureType,
    structureTypes,
} from './namespace-type';

export function thriftInstanceToObject<T extends { [N in string]: any }, V extends any>(
    metadata: any[],
    namespaces: T,
    indefiniteType: ValueType,
    value: V,
    currentNamespace?: string
): V {
    if (typeof value !== 'object' || isNil(value)) {
        return value;
    }
    const { namespace, type } = parseNamespaceType(indefiniteType, currentNamespace);
    const internalThriftInstanceToObject = (t: ValueType, v: V) =>
        thriftInstanceToObject(metadata, namespaces, t, v, namespace);
    if (isComplexType(type)) {
        switch (type.name) {
            case 'map':
                return new Map(
                    Array.from(value as Map<any, any>).map(([k, v]) => [
                        internalThriftInstanceToObject(type.keyType, k),
                        internalThriftInstanceToObject(type.valueType, v),
                    ])
                ) as V;
            case 'list':
                return (value as any[]).map((v) =>
                    internalThriftInstanceToObject(type.valueType, v)
                ) as V;
            case 'set':
                return new Set(
                    Array.from(value as Set<any>).map((v) =>
                        internalThriftInstanceToObject(type.valueType, v)
                    )
                ) as V;
            default:
                throw new Error('Unknown complex thrift type');
        }
    } else if (isPrimitiveType(type)) {
        switch (type) {
            case 'i64':
                return (value as Int64).toNumber() as V;
            default:
                return value;
        }
    }
    const namespaceMeta = metadata.find((m) => m.name === namespace);
    const structureType = (Object.keys(namespaceMeta.ast) as StructureType[]).find(
        (t) => namespaceMeta.ast[t][type]
    );
    if (!structureType || !structureTypes.includes(structureType)) {
        throw new Error('Unknown thrift structure type');
    }
    const typeMeta = namespaceMeta.ast[structureType][type];
    switch (structureType) {
        case 'typedef': {
            return internalThriftInstanceToObject(typeMeta.type, value);
        }
        case 'union': {
            const [key, val] = Object.entries(value).find(([, v]) => v !== null);
            const fieldTypeMeta = typeMeta.find((m) => m.name === key);
            return { [key]: internalThriftInstanceToObject(fieldTypeMeta.type, val) } as any;
        }
        default: {
            const result = {} as V;
            for (const [k, v] of Object.entries(value)) {
                const fieldTypeMeta = typeMeta.find((m) => m.name === k);
                if (v !== null && v !== undefined) {
                    result[k] = internalThriftInstanceToObject(fieldTypeMeta.type, v);
                }
            }
            return result;
        }
    }
}
