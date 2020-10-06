import pick from 'lodash-es/pick';
import pickBy from 'lodash-es/pickBy';

import { isNumeric, mapValuesToNumber, mapValuesToThriftEnum } from '../../../../utils';
import { SearchFormValue } from './search-form-value';

export const formValueToSearchParams = (params: {}): SearchFormValue => ({
    ...params,
    ...mapValuesToThriftEnum(pick(params, 'statuses')),
    ...mapValuesToNumber(pickBy(params, isNumeric)),
});
