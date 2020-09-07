import type { ListType, MapType, SetType, ThriftType, ValueType } from 'thrift-ts';

export const primitiveTypes = [
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

export function isThriftObject(value: any): boolean {
    return typeof value?.write === 'function' && typeof value?.read === 'function';
}

export function isComplexType(type: ValueType): type is SetType | ListType | MapType {
    return typeof type === 'object';
}

export function isPrimitiveType(type: ValueType): type is ThriftType {
    return primitiveTypes.includes(type as any);
}

export const structureTypes = ['typedef', 'struct', 'union', 'exception', 'enum'] as const;
export type StructureType = typeof structureTypes[number];

export function parseNamespaceType(type: ValueType, currentNamespace?: string) {
    if (!isComplexType(type) && !isPrimitiveType(type) && type.includes('.')) {
        [currentNamespace, type] = type.split('.');
    }
    return { namespace: currentNamespace, type };
}
