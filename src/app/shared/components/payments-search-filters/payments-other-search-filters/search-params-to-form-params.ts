import { toMajor } from '@cc/utils/index';

import { SearchFiltersParams } from '../search-filters-params';

export const searchParamsToFormParams = (params: SearchFiltersParams): SearchFiltersParams => {
    return {
        ...params,
        ...(params.paymentAmountFrom
            ? { paymentAmountFrom: amountToMajor(params.paymentAmountFrom) }
            : {}),
        ...(params.paymentAmountTo
            ? { paymentAmountTo: amountToMajor(params.paymentAmountTo) }
            : {}),
    };
};

const amountToMajor = (amount: string): string => toMajor(Number(amount)).toString();
