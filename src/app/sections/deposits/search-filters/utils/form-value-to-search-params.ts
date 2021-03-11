import { SearchParams } from '../../types/search-params';
import { FormValue } from '../types/form-value';

export const formValueToSearchParams = (value: FormValue): SearchParams => ({
    ...value,
    fromTime: value.fromTime ? value.fromTime.format() : null,
    toTime: value.toTime ? value.toTime.format() : null,
});
