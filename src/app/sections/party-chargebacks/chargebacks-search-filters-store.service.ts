import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { QueryParamsStore } from '../party-payments/query-params-store';
import { FormValue } from './chargebacks-search-filters/form-value';

const ARRAY_PARAMS: (keyof FormValue)[] = [
    'shop_ids',
    'chargeback_statuses',
    'chargeback_stages',
    'chargeback_categories',
];
const SEPARATOR = ',';

@Injectable()
export class ChargebacksSearchFiltersStore extends QueryParamsStore<FormValue> {
    constructor(protected router: Router, protected route: ActivatedRoute) {
        super(router, route);
    }

    mapToData(queryParams: Params = {}) {
        return Object.fromEntries(
            Object.entries(queryParams).map(([k, v]) => [
                k,
                ARRAY_PARAMS.includes(k as keyof FormValue)
                    ? v.split(SEPARATOR).filter((i) => i)
                    : v,
            ])
        ) as FormValue;
    }

    mapToParams({ from_time, to_time, ...data }: Partial<FormValue> = {}): Params {
        const dataWithStrArrays = Object.fromEntries(
            Object.entries(data).map(([k, v]) => [
                k,
                ARRAY_PARAMS.includes(k as keyof FormValue) && Array.isArray(v)
                    ? v.join(SEPARATOR)
                    : v,
            ])
        );
        return Object.assign(
            dataWithStrArrays,
            !!from_time && { from_time },
            !!to_time && { to_time }
        );
    }
}
