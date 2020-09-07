import { SearchFiltersParams } from '../search-filters-params';

export const queryToSearchParams = (value): SearchFiltersParams => {
    return {
        ...value,
        shopIDs: value.shopIDs && !Array.isArray(value.shopIDs) ? [value.shopIDs] : value.shopIDs,
    };
};
