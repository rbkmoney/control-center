import { Params } from '@angular/router';

export const queryParamsToFormValue = (params: Params) => {
    const result = {};
    for (const k in params) {
        if (params.hasOwnProperty(k)) {
            if (k === 'statuses' && typeof params[k] === 'string') {
                result[k] = [params[k]];
            } else {
                result[k] = params[k];
            }
        }
    }
    return result;
};
