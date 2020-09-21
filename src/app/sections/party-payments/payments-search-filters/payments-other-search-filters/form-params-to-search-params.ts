import { toMinor } from '../../../../shared/utils/to-minor';
import { SearchFiltersParams } from '../search-filters-params';

export const formParamsToSearchParams = (params: SearchFiltersParams): SearchFiltersParams => {
    return {
        ...params,
        ...(params.paymentAmountFrom
            ? { paymentAmountFrom: toMinor(Number(params.paymentAmountFrom)).toString() }
            : {}),
        ...(params.paymentAmountTo
            ? { paymentAmountTo: toMinor(Number(params.paymentAmountTo)).toString() }
            : {}),
    };
};
