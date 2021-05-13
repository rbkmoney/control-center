import type { ListType, MapType, SetType, ThriftType, ValueType } from 'thrift-ts';

export const PRIMITIVE_TYPES = [
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
    return PRIMITIVE_TYPES.includes(type as any);
}

export const STRUCTURE_TYPES = ['typedef', 'struct', 'union', 'exception', 'enum'] as const;
export type StructureType = typeof STRUCTURE_TYPES[number];

export function parseNamespaceType(type: ValueType, currentNamespace?: string) {
    if (!isComplexType(type) && !isPrimitiveType(type) && type.includes('.')) {
        [currentNamespace, type] = type.split('.');
    }
    return { namespace: currentNamespace, type };
}
