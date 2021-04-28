import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { QueryParamsStore } from '@cc/app/shared/services';

import { SearchParams } from '../../types/search-params';

@Injectable()
export class ParamsStoreService extends QueryParamsStore<SearchParams> {
    constructor(protected route: ActivatedRoute, protected router: Router) {
        super(router, route);
    }

    mapToData(queryParams: Params): SearchParams {
        return queryParams as SearchParams;
    }

    mapToParams(data: SearchParams): Params {
        return data;
    }
}
