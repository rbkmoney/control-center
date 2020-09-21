import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject, Subject } from 'rxjs';
import { map, pluck, scan, shareReplay } from 'rxjs/operators';

import { removeEmptyProperties } from '../../shared/utils';
import { NavigationParams } from './navigation-params';
import { SearchFiltersParams } from './payments-search-filters/search-filters-params';

@Injectable()
export class PartyPaymentsService {
    private navigationParamsChanges$ = new Subject<NavigationParams>();

    private searchParamsChange$ = new ReplaySubject<SearchFiltersParams>();

    searchParamsChanges$ = this.searchParamsChange$.pipe(
        scan((acc, curr) => ({ ...acc, ...curr })),
        map(removeEmptyProperties),
        shareReplay(1)
    );

    partyID$ = this.route.params.pipe(pluck('partyID'), shareReplay(1));

    paymentNavigationLink$ = this.navigationParamsChanges$.pipe(
        map(
            ({ partyID, invoiceID, paymentID }) =>
                `/party/${partyID}/invoice/${invoiceID}/payment/${paymentID}`
        )
    );

    constructor(private route: ActivatedRoute) {}

    searchParamsChanges(params: SearchFiltersParams) {
        this.searchParamsChange$.next(params);
    }

    updatePaymentNavigationLink(params: NavigationParams) {
        this.navigationParamsChanges$.next(params);
    }
}
