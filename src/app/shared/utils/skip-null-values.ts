import isArray from 'lodash-es/isArray';
import transform from 'lodash-es/transform';

export const skipNullValues = (obj: object): object => {
    return transform(
        obj,
        (acc, v, k) => {
            if (v === null) {
                return acc;
            }
            if (isArray(v)) {
                acc[k] = v.map(skipNullValues);
            } else if (typeof v === 'object') {
                acc[k] = skipNullValues(v);
            } else {
                acc[k] = v;
            }
        },
        {}
    );
};
