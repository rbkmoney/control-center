import { FormValue } from './form-value';

export const formValueToSearchParams = (value: FormValue) => {
    return {
        ...value,
        shopIDs: value.shopIDs && !Array.isArray(value.shopIDs) ? [value.shopIDs] : value.shopIDs,
        fromTime: value.fromTime.utc().format(),
        toTime: value.toTime.utc().format(),
    };
};
