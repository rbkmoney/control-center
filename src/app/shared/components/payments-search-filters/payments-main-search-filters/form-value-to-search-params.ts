import { SearchFiltersParams } from '../search-filters-params';
import { FormValue } from './form-value';

export const formValueToSearchParams = (value: FormValue): SearchFiltersParams => ({
    ...value,
    fromTime: value.fromTime ? value.fromTime.format() : null,
    toTime: value.toTime ? value.toTime.format() : null,
});
