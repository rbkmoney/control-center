import isNil from 'lodash-es/isNil';
import type { ValueType } from 'thrift-ts';

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
                    Array.from(value).map(([k, v]) => [
                        internalThriftInstanceToObject(type.keyType, k),
                        internalThriftInstanceToObject(type.valueType, v),
                    ])
                ) as any;
            case 'list':
                return value.map((v) => internalThriftInstanceToObject(type.valueType, v));
            case 'set':
                return new Set(
                    value.map((v) => internalThriftInstanceToObject(type.valueType, v))
                ) as any;
            default:
                throw new Error('Unknown complex thrift type');
        }
    } else if (isPrimitiveType(type)) {
        switch (type) {
            case 'i64':
                return value.toNumber();
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
        case 'typedef':
            return internalThriftInstanceToObject(typeMeta.type, value);
        case 'union':
            const [key, val] = Object.entries(value).find(([, v]) => v !== null);
            const fieldTypeMeta = typeMeta.find((m) => m.name === key);
            return { [key]: internalThriftInstanceToObject(fieldTypeMeta.type, val) } as any;
        default:
            const result = {} as V;
            for (const [k, v] of Object.entries(value)) {
                const fieldTypeMeta = typeMeta.find((m) => m.name === k);
                result[k] = internalThriftInstanceToObject(fieldTypeMeta.type, v);
            }
            return result;
    }
}
