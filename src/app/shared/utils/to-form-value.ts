import { Params } from '@angular/router';
import { isEmpty, mapValues } from 'lodash-es';

export const toFormValue = (q: Params) => {
    const mapped = mapValues(q, value => {
        console.log(value)
        if (isEmpty(value)) {
            return null;
        } else if (typeof value === 'string' && value.includes(',')) {
            return value.split(',');
        }
        return value;
    });
    console.log(mapped);
    return {
        ...mapped
    };
};
