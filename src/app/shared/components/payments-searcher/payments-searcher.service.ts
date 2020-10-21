import { Injectable } from '@angular/core';
import isEmpty from 'lodash-es/isEmpty';
import { ReplaySubject } from 'rxjs';
import { filter, scan, shareReplay, skip } from 'rxjs/operators';

import { SearchFiltersParams } from '../payments-search-filters/search-filters-params';

@Injectable()
export class PaymentsSearcherService {
    private searchParamsChange$ = new ReplaySubject<SearchFiltersParams>();

    searchParamsChanges$ = this.searchParamsChange$.pipe(
        filter((v) => !isEmpty(v)),
        scan((acc, curr) => ({ ...acc, ...curr })),
        skip(1),
        shareReplay(1)
    );

    searchParamsChanges(params: SearchFiltersParams) {
        this.searchParamsChange$.next(params);
    }
}
