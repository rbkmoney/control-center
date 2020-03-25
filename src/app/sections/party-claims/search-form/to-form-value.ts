import { Params } from '@angular/router';

export const toFormValue = (q: Params) => {
    const result = {};
    for (const k in q) {
        if (q.hasOwnProperty(k)) {
            if (k === 'statuses' && typeof q[k] === 'string') {
                result[k] = [q[k]];
                break;
            }
            result[k] = q[k];
        }
    }
    return result;
};
