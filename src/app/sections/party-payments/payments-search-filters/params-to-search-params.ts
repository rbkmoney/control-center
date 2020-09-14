import { clearParams } from './clear-params';
import { SearchFiltersParams } from './search-filters-params';

export const paramsToSearchParams = (
    initParams: SearchFiltersParams,
    formSearchParams: SearchFiltersParams,
    clearParamsKeys: string[]
): SearchFiltersParams => {
    const cleanParams = clearParams(initParams, clearParamsKeys);
    return { ...cleanParams, ...formSearchParams };
};
