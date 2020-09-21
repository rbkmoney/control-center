import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, ReplaySubject, Subject } from 'rxjs';
import { map, pluck, shareReplay } from 'rxjs/operators';

import { NavigationParams } from './navigation-params';
import { SearchFiltersParams } from './payments-search-filters/search-filters-params';

@Injectable()
export class PartyPaymentsService {
    private navigationParamsChanges$ = new Subject<NavigationParams>();

    private mainSearchParamsChanges$ = new ReplaySubject<SearchFiltersParams>();
    private otherSearchParamsChanges$ = new ReplaySubject<SearchFiltersParams>();

    searchParamsChanges$ = combineLatest([
        this.mainSearchParamsChanges$,
        this.otherSearchParamsChanges$,
    ]).pipe(
        map(([mainParams, otherParams]) => ({ ...mainParams, ...otherParams })),
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

    mainSearchParamsChanges(params: SearchFiltersParams) {
        this.mainSearchParamsChanges$.next(params);
    }

    otherSearchParamsChanges(params: SearchFiltersParams) {
        this.otherSearchParamsChanges$.next(params);
    }

    updatePaymentNavigationLink(params: NavigationParams) {
        this.navigationParamsChanges$.next(params);
    }
}
