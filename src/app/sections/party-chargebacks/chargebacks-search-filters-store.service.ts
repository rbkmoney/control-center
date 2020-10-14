import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import pickBy from 'lodash-es/pickBy';

import { FormValue } from '@cc/app/shared/components/chargebacks-search-filters';
import { wrapValuesToArray } from '@cc/utils/index';

import { QueryParamsStore } from '../party-payments/query-params-store';

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
        return Object.fromEntries(
            Object.entries(data).filter(([k, v]) => (Array.isArray(v) ? v?.length : v))
        );
    }
}
