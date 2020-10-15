import { ActivatedRoute, Params, Router } from '@angular/router';
import isEqual from 'lodash-es/isequal';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';

import { removeEmptyProperties } from '@cc/utils/index';

export abstract class QueryParamsStore<D> {
    data$: Observable<Partial<D>> = this.route.queryParams.pipe(
        distinctUntilChanged(isEqual),
        map((p) => this.mapToData(p)),
        shareReplay(1)
    );

    constructor(protected router: Router, protected route: ActivatedRoute) {}

    abstract mapToData(queryParams: Params): Partial<D>;

    abstract mapToParams(data: D): Params;

    preserve(data: D) {
        const queryParams = removeEmptyProperties(this.mapToParams(data));
        this.router.navigate([], { queryParams, preserveFragment: true });
    }
}
