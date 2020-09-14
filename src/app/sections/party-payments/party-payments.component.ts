import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { FetchPaymentsService } from './fetch-payments.service';
import { PaymentsSearchFiltersStore } from './payments-search-filters-store.service';
import { SearchFiltersParams } from './payments-search-filters/search-filters-params';
import { NavigationParams } from './navigation-params';
import { PartyPaymentsService } from './party-payments.service';

@Component({
    templateUrl: 'party-payments.component.html',
    styleUrls: ['party-payments.component.scss'],
    providers: [FetchPaymentsService, PaymentsSearchFiltersStore, PartyPaymentsService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartyPaymentsComponent implements OnInit {
    isLoading$ = this.fetchPaymentsService.isLoading$;
    doAction$ = this.fetchPaymentsService.doAction$;
    payments$ = this.fetchPaymentsService.searchResult$;
    hasMore$ = this.fetchPaymentsService.hasMore$;
    initSearchParams$ = this.paymentsSearchFiltersStore.data$;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private fetchPaymentsService: FetchPaymentsService,
        private paymentsSearchFiltersStore: PaymentsSearchFiltersStore,
        private partyPaymentsService: PartyPaymentsService,
        private snackBar: MatSnackBar
    ) {
        this.partyPaymentsService.paymentNavigationLink$.subscribe(link => {
            this.router.navigate([link]);
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

    searchParamsChanges(p: SearchFiltersParams) {
        this.fetchPaymentsService.search(p);
        this.paymentsSearchFiltersStore.preserve(p);
    }

    navigateToPayment(params: NavigationParams) {
        this.partyPaymentsService.updatePaymentNavigationLink(params);

    }
}
