import difference from 'lodash-es/difference';
import { ValueType } from 'thrift-ts';

import { createThriftInstance } from './create-thrift-instance';
import { thriftInstanceToObject } from './thrift-instance-to-object';

export function checkNamespaces(metadata: { name: string }[], namespaces: { [N in string]: any }) {
    const diff = difference(
        metadata.map(({ name }) => name),
        Object.keys(namespaces)
    );
    if (diff.length) {
        console.warn('It is necessary to match the metadata and namespaces:', diff);
    }
}

export function createThriftInstanceUtils<T extends { [N in string]: any }>(
    metadata: any[],
    namespaces: T
) {
    checkNamespaces(metadata, namespaces);
    return {
        createThriftInstance: <V>(namespace: keyof T, name: ValueType, value: V) =>
            createThriftInstance(metadata, namespaces, name, value, namespace as string),
        thriftInstanceToObject: <V>(namespace: keyof T, name: ValueType, value: V) =>
            thriftInstanceToObject(metadata, namespaces, name, value, namespace as string),
    };
}
