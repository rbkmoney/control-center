import { SearchFormValue } from './search-form-value';

export const convertFormValueToParams = (params: SearchFormValue) => {
    const result = {};
    for (const k in params) {
        if (params.hasOwnProperty(k)) {
            if (k === 'statuses') {
                result[k] = (params[k] as string[]).reduce((acc, cv) => [...acc, { [cv]: {} }], []);
            } else if (params[k]) {
                if (params[k] === '') {
                    break;
                }
                result[k] = params[k].trim();
            }
        }
    }
    return result;
};
