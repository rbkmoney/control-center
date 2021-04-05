import { toMinor } from '@cc/utils/to-minor';

import { SearchParams } from '../../types/search-params';
import { FormValue } from '../types/form-value';

export const formValueToSearchParams = (value: FormValue): SearchParams => ({
    ...value,
    fromTime: value.fromTime ? value.fromTime.startOf('day').toISOString() : null,
    toTime: value.toTime ? value.toTime.endOf('day').toISOString() : null,
    amountTo: value.amountTo ? toMinor(value.amountTo) : null,
});
