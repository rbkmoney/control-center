import moment from 'moment';

import { SearchFiltersParams } from '../search-filters-params';
import { FormValue } from './form-value';

export const searchParamsToFormParams = (value: SearchFiltersParams): FormValue =>
    ({
        ...value,
        ...(value.fromTime ? { fromTime: moment(value.fromTime) } : {}),
        ...(value.toTime ? { toTime: moment(value.toTime) } : {}),
    } as any);
