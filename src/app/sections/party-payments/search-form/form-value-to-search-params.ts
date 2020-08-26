import { FormValue } from './form-value';

export const formValueToSearchParams = (value: FormValue) => {
    return {
        ...value,
        fromTime: value.fromTime.utc().format(),
        toTime: value.toTime.utc().format(),
    };
};
