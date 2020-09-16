import { toMinor } from '../../../shared/utils/to-minor';
import { clearParams } from './clear-params';
import { SearchFiltersParams } from './search-filters-params';

export const paramsToSearchParams = (
    initParams: SearchFiltersParams,
    formSearchParams: SearchFiltersParams,
    clearParamsKeys: string[]
): SearchFiltersParams => {
    const cleanParams = clearParams(initParams, clearParamsKeys);
    return {
        ...cleanParams,
        ...formSearchParams,
        ...(formSearchParams.paymentAmountFrom
            ? { paymentAmountFrom: toMinor(Number(formSearchParams.paymentAmountFrom)).toString() }
            : {}),
        ...(formSearchParams.paymentAmountTo
            ? { paymentAmountTo: toMinor(Number(formSearchParams.paymentAmountTo)).toString() }
            : {}),
    };
};
