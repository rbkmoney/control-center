import { ActivatedRoute, Params, Router } from '@angular/router';
import isEqual from 'lodash.isequal';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';

export abstract class QueryParamsStore<D> {
    data$: Observable<D> = this.route.queryParams.pipe(
        distinctUntilChanged(isEqual),
        map((p) => this.mapToData(p)),
        shareReplay(1)
    );

    constructor(protected router: Router, protected route: ActivatedRoute) {}

    abstract mapToData(queryParams: Params): D;

    abstract mapToParams(data: D): Params;

    preserve(data: D) {
        this.router.navigate([], { queryParams: this.mapToParams(data), preserveFragment: true });
    }
}
