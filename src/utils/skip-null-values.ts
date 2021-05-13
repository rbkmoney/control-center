import isMap from 'lodash-es/isMap';
import isSet from 'lodash-es/isSet';
import transform from 'lodash-es/transform';

export const skipNullValues = (obj) =>
    transform(
        obj,
        (acc, v, k) => {
            if (v === null) {
                return acc;
            }
            if (Array.isArray(v)) {
                acc[k] = v.map(skipNullValues);
            } else if (isMap(v)) {
                acc[k] = Object.fromEntries(v);
            } else if (isSet(v)) {
                acc[k] = Array.from(v);
            } else if (typeof v === 'object') {
                acc[k] = skipNullValues(v);
            } else {
                acc[k] = v;
            }
            return acc;
        },
        {}
    );
