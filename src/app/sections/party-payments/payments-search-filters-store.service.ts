import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import pickBy from 'lodash-es/pickBy';

import { QueryParamsStore } from '../../shared/services';
import { SearchFiltersParams } from './payments-search-filters/search-filters-params';

const wrapValuesToArray = (params: {}): {} =>
    Object.entries(params).reduce((acc, [k, v]) => ({ ...acc, [k]: [v] }), {});

const shopIDsAndPrimitives = (v, k) => typeof v === 'string' && k === 'shopIDs';

@Injectable()
export class PaymentsSearchFiltersStore extends QueryParamsStore<SearchFiltersParams> {
    constructor(protected route: ActivatedRoute, protected router: Router) {
        super(router, route);
    }

    mapToData(queryParams: Params): SearchFiltersParams {
        return {
            ...queryParams,
            ...wrapValuesToArray(pickBy(queryParams, shopIDsAndPrimitives)),
        } as SearchFiltersParams;
    }

    mapToParams(data: SearchFiltersParams): Params {
        return data;
    }
}
