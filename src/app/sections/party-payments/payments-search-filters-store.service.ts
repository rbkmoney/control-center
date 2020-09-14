import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { QueryParamsStore } from '../../shared/services';
import { SearchFiltersParams } from './payments-search-filters/search-filters-params';
import { getShopIDs } from '../../shared/utils';

@Injectable()
export class PaymentsSearchFiltersStore extends QueryParamsStore<SearchFiltersParams> {
    constructor(protected route: ActivatedRoute, protected router: Router) {
        super(router, route);
    }

    mapToData(queryParams: Params): SearchFiltersParams {
        return {
            ...queryParams,
            shopIDs: getShopIDs(queryParams.shopIDs)
        } as SearchFiltersParams;
    }

    mapToParams(data: SearchFiltersParams): Params {
        return data;
    }
}
