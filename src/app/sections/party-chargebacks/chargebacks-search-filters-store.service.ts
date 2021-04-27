import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { QueryParamsStore } from '@cc/app/shared/services';
import { wrapValuesToArray } from '@cc/utils/wrap-values-to-array';
import pickBy from 'lodash-es/pickBy';

import { FormValue } from './chargebacks-search-filters';

const ARRAY_PARAMS: (keyof FormValue)[] = [
    'shop_ids',
    'chargeback_statuses',
    'chargeback_stages',
    'chargeback_categories',
];

@Injectable()
export class ChargebacksSearchFiltersStore extends QueryParamsStore<FormValue> {
    constructor(protected router: Router, protected route: ActivatedRoute) {
        super(router, route);
    }

    mapToData(queryParams: Params = {}) {
        return {
            ...queryParams,
            ...wrapValuesToArray(
                pickBy(
                    queryParams,
                    (v, k: keyof FormValue) => typeof v === 'string' && ARRAY_PARAMS.includes(k)
                )
            ),
        } as FormValue;
    }

    mapToParams(data: Partial<FormValue> = {}): Params {
        return data;
    }
}
