import { SearchFiltersParams } from './search-filters-params';
import { clearParams } from './clear-params';

export const paramsToSearchParams = (initParams: SearchFiltersParams, formSearchParams: SearchFiltersParams, clearParamsKeys: string[]): SearchFiltersParams => {
    const cleanParams = clearParams(initParams, clearParamsKeys);
    return { ...cleanParams, ...formSearchParams };
};
