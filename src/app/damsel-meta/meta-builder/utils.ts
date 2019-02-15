import { ValueType, SetType, ListType, MapType } from 'thrift-ts';
import isString from 'lodash-es/isString';
import isObject from 'lodash-es/isObject';

export const isPrimitiveType = (type: ValueType): boolean =>
    isString(type) &&
    ['int', 'bool', 'i8', 'i16', 'i32', 'i64', 'string', 'double', 'binary'].includes(type);

export const isComplexType = (type: ValueType, typeName: 'map' | 'list' | 'set'): boolean => {
    if (!isObject(type)) {
        return false;
    }
    const { name } = type as SetType | ListType | MapType;
    return name === typeName;
};

export const isRef = (name: string): boolean => name.endsWith('Ref');
