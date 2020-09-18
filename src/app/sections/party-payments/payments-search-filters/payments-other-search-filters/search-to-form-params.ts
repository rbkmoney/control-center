import { toMajor } from '../../../../shared/utils/to-major';
import { SearchFiltersParams } from '../search-filters-params';

export const searchToFormParams = (params: SearchFiltersParams): SearchFiltersParams => {
    return {
        ...params,
        ...(params.paymentAmountFrom
            ? { paymentAmountFrom: toMajor(Number(params.paymentAmountFrom)).toString() }
            : {}),
        ...(params.paymentAmountTo
            ? { paymentAmountTo: toMajor(Number(params.paymentAmountTo)).toString() }
            : {}),
    };
};
