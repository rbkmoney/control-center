import { toMinor } from '@cc/utils/to-minor';

import { SearchFiltersParams } from '../search-filters-params';

export const formParamsToSearchParams = (params: SearchFiltersParams): SearchFiltersParams => {
    return {
        ...params,
        ...(params.paymentAmountFrom
            ? { paymentAmountFrom: amountToMinor(params.paymentAmountFrom) }
            : {}),
        ...(params.paymentAmountTo
            ? { paymentAmountTo: amountToMinor(params.paymentAmountTo) }
            : {}),
    };
};

const amountToMinor = (amount: string): string => toMinor(Number(amount)).toString();
