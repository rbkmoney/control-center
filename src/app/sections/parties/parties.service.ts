import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { PartiesSearchFiltersParams } from '@cc/app/shared/components';
import { QueryParamsStore } from '@cc/app/shared/services';

@Injectable()
export class PartiesService extends QueryParamsStore<PartiesSearchFiltersParams> {
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
