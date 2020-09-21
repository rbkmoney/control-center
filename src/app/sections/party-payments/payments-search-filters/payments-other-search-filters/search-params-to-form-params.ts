import { toMajor } from '../../../../shared/utils/to-major';
import { SearchFiltersParams } from '../search-filters-params';
import { FormParams } from './form-params';

export const searchParamsToFormParams = (params: SearchFiltersParams): FormParams => {
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
