import isObject from 'lodash-es/isObject';
import { ValueType } from 'thrift-ts';

import { PrimitiveType } from '../model';

export const isPrimitiveType = (type: any): boolean =>
    typeof type === 'string' && Object.keys(PrimitiveType).includes(type);

export const isObjectRefType = (meta: any) => typeof meta === 'string' && !isPrimitiveType(meta);

export const isComplexType = (type: ValueType, typeName: 'map' | 'list' | 'set'): boolean => {
    if (!isObject(type)) {
        return false;
    }
    const { name } = type;
    return name === typeName;
};

export const isRef = (name: string): boolean => name.endsWith('Ref');

export const registerError = (errContainer: string[], message: string, prefix: string) => {
    const error = `${prefix}. ${message}`;
    return [...errContainer, error];
};
