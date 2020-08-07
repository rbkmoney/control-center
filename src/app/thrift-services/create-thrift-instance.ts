import type { ThriftType, ValueType, SetType, ListType, MapType } from 'thrift-ts';
import Int64 from 'thrift-ts/lib/int64';
import difference from 'lodash-es/difference';

const primitiveTypes = [
    'int',
    'bool',
    'i8',
    'i16',
    'i32',
    'i64',
    'string',
    'double',
    'binary',
] as const;

function isThriftObject(value: any): boolean {
    return typeof value?.write === 'function' && typeof value?.read === 'function';
}

function isComplexType(type: ValueType): type is SetType | ListType | MapType {
    return typeof type === 'object';
}

function isPrimitiveType(type: ValueType): type is ThriftType {
    return primitiveTypes.includes(type as any);
}

const types = ['typedef', 'struct', 'union', 'exception', 'enum'] as const;

export function createThriftInstance<T extends { [N in string]: any }, V extends any>(
    metadata: any[],
    namespaces: T,
    type: ValueType,
    value: V,
    currentNamespace?: string
): V {
    if (isThriftObject(value)) {
        return value;
    }
    const createInternalThriftInstance = (t: ValueType, v: V, c = currentNamespace) =>
        createThriftInstance(metadata, namespaces, t, v, c);
    if (isComplexType(type)) {
        switch (type.name) {
            case 'map':
                return new Map(
                    Array.from(value).map(([k, v]) => [
                        createInternalThriftInstance(type.keyType, k),
                        createInternalThriftInstance(type.valueType, v),
                    ])
                ) as any;
            case 'list':
                return value.map((v) => createInternalThriftInstance(type.valueType, v));
            case 'set':
                return new Set(
                    value.map((v) => createInternalThriftInstance(type.valueType, v))
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
    const [namespace, name] = type.includes('.') ? type.split('.') : [currentNamespace, type];
    const namespaceMeta = metadata.find((m) => m.name === namespace);
    const structureType = types.find((t) => namespaceMeta.ast[t][name]);
    if (!structureType) {
        throw new Error('Unknown thrift structure type');
    }
    const typeMeta = namespaceMeta.ast[structureType][name];
    if (structureType === 'typedef') {
        return createInternalThriftInstance(typeMeta.type, value, namespace);
    }
    const instance = new namespaces[namespace][name]();
    for (const [k, v] of Object.entries(value)) {
        const fieldTypeMeta = typeMeta.find((m) => m.name === k);
        instance[k] = createInternalThriftInstance(fieldTypeMeta.type, v, namespace);
    }
    return instance;
}

export function checkNamespaces(metadata: { name: string }[], namespaces: { [N in string]: any }) {
    const diff = difference(
        metadata.map(({ name }) => name),
        Object.keys(namespaces)
    );
    if (diff.length) {
        console.warn('It is necessary to match the metadata and namespaces:', diff);
    }
}

export function createNamespaceThriftInstanceCreatorByName<T extends { [N in string]: any }>(
    metadata: any[],
    namespaces: T
) {
    checkNamespaces(metadata, namespaces);
    return <V>(namespace: keyof T, name: string, value: V) =>
        createThriftInstance(metadata, namespaces, name, value, namespace as string);
}
