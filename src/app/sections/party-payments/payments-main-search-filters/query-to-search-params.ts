import { FormValue } from './form-value';

import { PaymentsSearchParams } from '../payments-search-params';

export const queryToSearchParams = (value): PaymentsSearchParams => {
    return {
        ...value,
        shopIDs: value.shopIDs && !Array.isArray(value.shopIDs) ? [value.shopIDs] : value.shopIDs,
        // fromTime: value.fromTime.utc().format(),
        // toTime: value.toTime.utc().format(),
    };
};
