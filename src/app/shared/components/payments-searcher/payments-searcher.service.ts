import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { scan, shareReplay, skip } from 'rxjs/operators';

import { SearchFiltersParams } from '../payments-search-filters/search-filters-params';

@Injectable()
export class PaymentsSearcherService {
    private searchParamsChange$ = new ReplaySubject<SearchFiltersParams>();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    searchParamsChanges$ = this.searchParamsChange$.pipe(
        scan((acc, curr) => ({ ...acc, ...curr })),
        skip(1),
        shareReplay(1)
    );

    searchParamsChanges(params: SearchFiltersParams) {
        this.searchParamsChange$.next(params);
    }
}
