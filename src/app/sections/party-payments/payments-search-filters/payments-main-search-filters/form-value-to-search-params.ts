import { SearchFiltersParams } from '../search-filters-params';
import { FormValue } from './form-value';
import { getShopIDs } from '../../../../shared/utils';

export const formValueToSearchParams = (value: FormValue): SearchFiltersParams => {
    return {
        ...value,
        shopIDs: getShopIDs(value.shopIDs),
        fromTime: value.fromTime ? value.fromTime.utc().format() : null,
        toTime: value.toTime ? value.toTime.utc().format() : null,
    };
};
