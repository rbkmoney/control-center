import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { FetchPaymentsService } from './fetch-payments.service';
import { NavigationParams } from './navigation-params';
import { PartyPaymentsService } from './party-payments.service';
import { PaymentsSearchFiltersStore } from './payments-search-filters-store.service';
import { SearchFiltersParams } from './payments-search-filters/search-filters-params';

@Component({
    templateUrl: 'party-payments.component.html',
    styleUrls: ['party-payments.component.scss'],
    providers: [FetchPaymentsService, PaymentsSearchFiltersStore, PartyPaymentsService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartyPaymentsComponent implements OnInit {
    mainSearchParams$ = new Subject<SearchFiltersParams>();
    otherSearchParams$ = new BehaviorSubject<SearchFiltersParams>({});

    searchParamsChanges$ = combineLatest([this.mainSearchParams$, this.otherSearchParams$]);

    partyID$ = this.partyPaymentsService.partyID$;
    isLoading$ = this.fetchPaymentsService.isLoading$;
    doAction$ = this.fetchPaymentsService.doAction$;
    payments$ = this.fetchPaymentsService.searchResult$;
    hasMore$ = this.fetchPaymentsService.hasMore$;
    initSearchParams$ = this.paymentsSearchFiltersStore.data$;

    constructor(
        private router: Router,
        private fetchPaymentsService: FetchPaymentsService,
        private paymentsSearchFiltersStore: PaymentsSearchFiltersStore,
        private partyPaymentsService: PartyPaymentsService,
        private snackBar: MatSnackBar
    ) {
        this.partyPaymentsService.paymentNavigationLink$.subscribe((link) => {
            this.router.navigate([link]);
        });
        this.searchParamsChanges$.subscribe(([mainParams, otherParams]) => {
            const params = { ...mainParams, ...otherParams };
            this.fetchPaymentsService.search(params);
            this.paymentsSearchFiltersStore.preserve(params);
        });
    }

    ngOnInit() {
        this.fetchPaymentsService.errors$.subscribe((e) =>
            this.snackBar.open(`An error occurred while search payments (${e})`, 'OK')
        );
    }

    fetchMore() {
        this.fetchPaymentsService.fetchMore();
    }

    mainSearchParamsChanges(params: SearchFiltersParams) {
        this.mainSearchParams$.next(params);
    }

    otherSearchParamsChanges(params: SearchFiltersParams) {
        this.otherSearchParams$.next(params);
    }

    navigateToPayment(params: NavigationParams) {
        this.partyPaymentsService.updatePaymentNavigationLink(params);
    }
}
