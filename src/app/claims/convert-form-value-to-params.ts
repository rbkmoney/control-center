import { SearchFormValue } from './search-form/search-form-value';

export const convertFormValueToParams = (params: SearchFormValue) => {
    const result = {};
    for (const k in params) {
        if (params.hasOwnProperty(k)) {
            if (k === 'statuses') {
                result[k] = (params[k] as string[]).reduce((acc, cv) => ({ ...acc, [cv]: {} }), {});
            } else {
                result[k] = params[k];
            }
        }
    }
    return result;
};
