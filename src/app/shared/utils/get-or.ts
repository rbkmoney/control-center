import get from 'lodash-es/get';
import isEmpty from 'lodash-es/isEmpty';

export const getOr = (object: any, path: string | string[], defaultValue: any): any => {
    const val = get(object, path);
    return isEmpty(val) ? defaultValue : val;
};
