import forIn from 'lodash-es/forIn';
import isObject from 'lodash-es/isObject';

function toMap(collection: any[]): Map<any, any> {
    const result = new Map();
    for (const item of collection) {
        result.set(decode(item.key), decode(item.value));
    }
    return result;
}

function toList(collection: any[]): any[] {
    const result = [];
    for (const item of collection) {
        result.push(decode(item));
    }
    return result;
}

function toSet(collection: any[]): Set<any> {
    const result = new Set();
    for (const item of collection) {
        result.add(decode(item));
    }
    return result;
}

function decodeArray(arr: any[]): any[] | Map<any, any> | Set<any> {
    const type = arr[0];
    if (typeof type === 'string') {
        const collection = arr.slice(1);
        switch (type) {
            case 'map':
                return toMap(collection);
            case 'list':
                return toList(collection);
            case 'set':
                return toSet(collection);
        }
    }
    return [];
}

function decodeObject(obj: any): any {
    const result = {};
    forIn(obj, (value, key) => (result[key] = isObject(value) ? decode(value) : value));
    return result;
}

export function decode(thrift: any): any {
    if (Array.isArray(thrift)) {
        return decodeArray(thrift);
    } else if (isObject(thrift)) {
        return decodeObject(thrift);
    } else {
        return thrift;
    }
}

export function encode(model: any): any | any[] {
    let result;
    if (Array.isArray(model)) {
        result = ['list'];
        for (const item of model) {
            if (typeof item === 'object') {
                result.push(encode(item));
            }
        }
    } else {
        result = {};
        forIn(model, (value, key) => {
            if (typeof value === 'object') {
                result[key] = encode(value);
            } else {
                result[key] = value;
            }
        });
    }
    return result;
}
