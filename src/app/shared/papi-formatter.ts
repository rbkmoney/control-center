import camelCase from 'lodash-es/camelCase';
import snakeCase from 'lodash-es/snakeCase';
import isArray from 'lodash-es/isArray';
import isObject from 'lodash-es/isObject';

export function encode(model: any): any {
    if (isArray(model)) {
        return model.map(encode);
    } else if (isObject(model)) {
        const result = {};
        for (const key of Object.keys(model)) {
            result[snakeCase(key)] = encode(model[key]);
        }
        return result;
    }
    return model;
}

export function decode(model: any): any {
    if (isArray(model)) {
        return model.map(decode);
    } else if (isObject(model)) {
        const result = {};
        for (const key of Object.keys(model)) {
            result[camelCase(key)] = decode(model[key]);
        }
        return result;
    }
    return model;
}
