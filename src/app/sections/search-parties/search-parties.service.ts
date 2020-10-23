import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { QueryParamsStore } from '@cc/app/shared/services';

import { PartiesSearchFiltersParams } from './parties-search-filters';

@Injectable()
export class SearchPartiesService extends QueryParamsStore<PartiesSearchFiltersParams> {
    constructor(protected route: ActivatedRoute, protected router: Router) {
        super(router, route);
    }

    mapToData(queryParams: Params): PartiesSearchFiltersParams {
        return queryParams as PartiesSearchFiltersParams;
    }

    mapToParams(data: PartiesSearchFiltersParams): Params {
        return data;
    }
}
