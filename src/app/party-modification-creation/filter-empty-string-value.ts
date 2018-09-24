import isDate from 'lodash-es/isDate';
import isArray from 'lodash-es/isArray';
import isObject from 'lodash-es/isObject';
import reduce from 'lodash-es/reduce';

type Filter = (value: any) => boolean;

const filterObject = (object: object, filter: Filter): object =>
    reduce(object, (result, value, key) => {
        if (filter(value)) {
            return {
                ...result,
                [key]: filterValues(value, filter)
            };
        }
        return result;
    }, {});

export const filterValues = (value: any, filter: Filter): any => {
    if (isDate(value)) {
        return value;
    }
    if (isArray(value)) {
        console.error('Array is not supported', value);
        return value;
    }
    if (isObject(value)) {
        return filterObject(value, filter);
    }
    return value;
};

export const filterEmptyStringValues = (value: any) =>
    filterValues(value, (v) => v !== '');
