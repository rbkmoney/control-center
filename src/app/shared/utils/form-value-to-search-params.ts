import mapValues from 'lodash-es/mapValues';

export const formValueToSearchParams = <T>(formValue): T => {
    return mapValues(formValue, value => {
        let result = value;
        if (value === '') {
            result = null;
        } else if (typeof value === 'string') {
            result = value.trim();
        }
        return result;
    });
};
