import { SearchFiltersParams } from '../search-filters-params';
import { FormValue } from './form-value';

export const formValueToSearchParams = (value: FormValue): SearchFiltersParams => {
    return {
        ...value,
        shopIDs: value.shopIDs && !Array.isArray(value.shopIDs) ? [value.shopIDs] : value.shopIDs,
        fromTime: value.fromTime ? value.fromTime.utc().format() : null,
        toTime: value.toTime ? value.toTime.utc().format() : null,
    };
};
