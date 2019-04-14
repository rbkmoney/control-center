import { ValueType, SetType, ListType, MapType } from 'thrift-ts';
import isString from 'lodash-es/isString';
import isObject from 'lodash-es/isObject';

import { PrimitiveType } from '../model';

export const isPrimitiveType = (type: any): boolean =>
    isString(type) && Object.keys(PrimitiveType).includes(type);

export const isObjectRefType = (meta: any) => isString(meta) && !isPrimitiveType(meta);

export const isComplexType = (type: ValueType, typeName: 'map' | 'list' | 'set'): boolean => {
    if (!isObject(type)) {
        return false;
    }
    const { name } = type as SetType | ListType | MapType;
    return name === typeName;
};

export const isRef = (name: string): boolean => name.endsWith('Ref');

export const registerError = (errContainer: string[], message: string, prefix: string) => {
    const error = `${prefix}. ${message}`;
    return [...errContainer, error];
};
