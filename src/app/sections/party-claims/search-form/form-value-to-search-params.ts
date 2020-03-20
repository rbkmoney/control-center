import { SearchFormValue } from '../search-form-value';
import mapValues from 'lodash-es/mapValues';

export const formValueToSearchParams = (formValue): SearchFormValue =>
    mapValues(formValue, value => {
        let result = value;
        if (value === '') {
            result = null;
        } else if (typeof value === 'string') {
            result = value.trim();
        }
        return result;
    });
