import { toMinor } from '../../../shared/utils/to-minor';
import { SearchFiltersParams } from './search-filters-params';
import { filterParams } from './filter-params';

export const paramsToSearchParams = (
    initParams: SearchFiltersParams,
    formSearchParams: SearchFiltersParams,
    paramsToFilter: string[]
): SearchFiltersParams => {
    const filteredParams = filterParams(initParams, paramsToFilter);
    return {
        ...filteredParams,
        ...formSearchParams,
        ...(formSearchParams.paymentAmountFrom
            ? { paymentAmountFrom: toMinor(Number(formSearchParams.paymentAmountFrom)).toString() }
            : {}),
        ...(formSearchParams.paymentAmountTo
            ? { paymentAmountTo: toMinor(Number(formSearchParams.paymentAmountTo)).toString() }
            : {}),
    };
};
