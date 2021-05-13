import isDate from 'lodash-es/isDate';
import isObject from 'lodash-es/isObject';
import reduce from 'lodash-es/reduce';
import * as moment from 'moment';

type Filter = (value: any) => boolean;

function filterObject(object: any, filter: Filter): any {
    return reduce(
        object,
        (result, value, key) => {
            if (filter(value)) {
                return {
                    ...result,
                    [key]: filterValues(value, filter),
                };
            }
            return result;
        },
        {}
    );
}

export function filterValues(value: any, filter: Filter): any {
    if (isDate(value)) {
        return value;
    }
    if (moment.isMoment(value)) {
        return value.toISOString();
    }
    if (Array.isArray(value)) {
        console.error('Array is not supported', value);
        return value;
    }
    if (isObject(value)) {
        return filterObject(value, filter);
    }
    return value;
}

export const filterEmptyStringValues = (value: any) => filterValues(value, (v) => v !== '');
