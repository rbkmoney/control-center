import type { ValueType } from 'thrift-ts';
import Int64 from 'thrift-ts/lib/int64';

import {
    isComplexType,
    isPrimitiveType,
    isThriftObject,
    parseNamespaceType,
    StructureType,
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
                    Array.from(value as any[]).map(([k, v]) => [
                        internalCreateThriftInstance(type.keyType, k),
                        internalCreateThriftInstance(type.valueType, v),
                    ])
                ) as V;
            case 'list':
            case 'set':
                return (value as any[]).map((v) =>
                    internalCreateThriftInstance(type.valueType, v)
                ) as V;
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
    const structureType = (Object.keys(namespaceMeta.ast) as StructureType[]).find(
        (t) => namespaceMeta.ast[t][type]
    );
    if (!structureType || !structureTypes.includes(structureType)) {
        throw new Error('Unknown thrift structure type');
    }
    switch (structureType) {
        case 'enum':
            return value;
        default:
            const typeMeta = namespaceMeta.ast[structureType][type];
            try {
                if (structureType === 'typedef') {
                    return internalCreateThriftInstance(typeMeta.type, value);
                }
                const instance = new namespaces[namespace][type]();
                for (const [k, v] of Object.entries(value)) {
                    const fieldTypeMeta = typeMeta.find((m) => m.name === k);
                    instance[k] = internalCreateThriftInstance(fieldTypeMeta.type, v);
                }
                return instance;
            } catch (error) {
                console.error(
                    'Thrift structure',
                    structureType,
                    'creation error:',
                    namespace,
                    type,
                    '(meta type:',
                    typeMeta,
                    '), value:',
                    value
                );
                throw error;
            }
    }
}
