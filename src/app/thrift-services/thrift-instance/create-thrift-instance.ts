import type { ValueType } from 'thrift-ts';
import Int64 from 'thrift-ts/lib/int64';

import {
    isComplexType,
    isPrimitiveType,
    isThriftObject,
    parseNamespaceType,
    structureTypes,
} from './namespace-type';

export function createThriftInstance<T extends { [N in string]: any }, V extends any>(
    metadata: any[],
    namespaces: T,
    indefiniteType: ValueType,
    value: V,
    currentNamespace?: string
): V {
    if (isThriftObject(value)) {
        return value;
    }
    const { namespace, type } = parseNamespaceType(indefiniteType, currentNamespace);
    const internalCreateThriftInstance = (t: ValueType, v: V) =>
        createThriftInstance(metadata, namespaces, t, v, namespace);
    if (isComplexType(type)) {
        switch (type.name) {
            case 'map':
                return new Map(
                    Array.from(value).map(([k, v]) => [
                        internalCreateThriftInstance(type.keyType, k),
                        internalCreateThriftInstance(type.valueType, v),
                    ])
                ) as any;
            case 'list':
                return value.map((v) => internalCreateThriftInstance(type.valueType, v));
            case 'set':
                return new Set(
                    value.map((v) => internalCreateThriftInstance(type.valueType, v))
                ) as any;
            default:
                throw new Error('Unknown complex thrift type');
        }
    } else if (isPrimitiveType(type)) {
        switch (type) {
            case 'i64':
                return new Int64(value as any) as any;
            default:
                return value;
        }
    }
    const namespaceMeta = metadata.find((m) => m.name === namespace);
    const structureType = structureTypes.find((t) => namespaceMeta.ast[t][type]);
    if (!structureType) {
        throw new Error('Unknown thrift structure type');
    }
    const typeMeta = namespaceMeta.ast[structureType][type];
    if (structureType === 'typedef') {
        return internalCreateThriftInstance(typeMeta.type, value);
    }
    const instance = new namespaces[namespace][type]();
    for (const [k, v] of Object.entries(value)) {
        const fieldTypeMeta = typeMeta.find((m) => m.name === k);
        instance[k] = internalCreateThriftInstance(fieldTypeMeta.type, v);
    }
    return instance;
}
