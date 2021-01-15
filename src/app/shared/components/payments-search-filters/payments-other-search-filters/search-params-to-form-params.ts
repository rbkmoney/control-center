import { toMajor } from '@cc/utils/to-major';

import { SearchFiltersParams } from '../search-filters-params';

export const searchParamsToFormParams = (params: SearchFiltersParams): SearchFiltersParams => ({
    ...params,
    ...(params.paymentAmountFrom
        ? { paymentAmountFrom: amountToMajor(params.paymentAmountFrom) }
        : {}),
    ...(params.paymentAmountTo ? { paymentAmountTo: amountToMajor(params.paymentAmountTo) } : {}),
});

const amountToMajor = (amount: string): string => toMajor(Number(amount)).toString();
