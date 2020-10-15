import { Injectable } from '@angular/core';
import isEmpty from 'lodash-es/isEmpty';
import isEqual from 'lodash-es/isEqual';
import { ReplaySubject } from 'rxjs';
import { distinctUntilChanged, filter, map, scan, shareReplay } from 'rxjs/operators';

import { removeEmptyProperties } from '@cc/utils/remove-empty-properties';

import { SearchFiltersParams } from '../payments-search-filters/search-filters-params';

@Injectable()
export class PaymentsSearcherService {
    private searchParamsChange$ = new ReplaySubject<SearchFiltersParams>();

    searchParamsChanges$ = this.searchParamsChange$.pipe(
        filter((v) => !isEmpty(v)),
        scan((acc, curr) => ({ ...acc, ...curr })),
        map(removeEmptyProperties),
        shareReplay(1),
        distinctUntilChanged(isEqual)
    );

    searchParamsChanges(params: SearchFiltersParams) {
        this.searchParamsChange$.next(params);
    }
}
