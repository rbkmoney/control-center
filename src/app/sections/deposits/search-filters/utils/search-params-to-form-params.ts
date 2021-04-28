import moment from 'moment';

import { toMajor } from '@cc/utils/to-major';

import { SearchParams } from '../../types/search-params';
import { FormValue } from '../types/form-value';

export const searchParamsToFormParams = (value: SearchParams): FormValue =>
    ({
        ...value,
        ...(value.fromTime ? { fromTime: moment(value.fromTime) } : {}),
        ...(value.toTime ? { toTime: moment(value.toTime) } : {}),
        ...(value.amountTo ? { amountTo: toMajor(value.amountTo) } : {}),
    } as any);
