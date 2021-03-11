import moment from 'moment';

import { SearchParams } from '../../types/search-params';
import { FormValue } from '../types/form-value';

export const searchParamsToFormParams = (value: SearchParams): FormValue =>
    ({
        ...value,
        ...(value.fromTime ? { fromTime: moment(value.fromTime) } : {}),
        ...(value.toTime ? { toTime: moment(value.toTime) } : {}),
    } as any);
