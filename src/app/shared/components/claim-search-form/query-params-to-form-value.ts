import { Params } from '@angular/router';
import pickBy from 'lodash-es/pickBy';

import { wrapValuesToArray } from '@cc/utils/wrap-values-to-array';

const statusesAndPrimitives = (v, k) =>
    k === 'statuses' && (typeof v === 'string' || typeof v === 'number');

export const queryParamsToFormValue = (params: Params) => ({
    ...params,
    // Query param ?statuses=accepted will be present as { statuses: 'accepted' } in form. Selector value must be an array in multiple-selection mode.
    ...wrapValuesToArray(pickBy(params, statusesAndPrimitives)),
});
