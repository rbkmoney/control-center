import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { PartyID } from '../../../thrift-services/damsel/gen-model/domain';
import { SearchFiltersParams } from '../payments-search-filters/search-filters-params';
import { FetchPaymentsService } from './fetch-payments.service';
import { NavigationParams } from './navigation-params';
import { PaymentsSearchFiltersStore } from './payments-searcher-filters-store.service';
import { PaymentsSearcherService } from './payments-searcher.service';

@Component({
    selector: 'cc-payments-searcher',
    templateUrl: 'payments-searcher.component.html',
    styleUrls: ['payments-searcher.component.scss'],
    providers: [FetchPaymentsService, PaymentsSearchFiltersStore, PaymentsSearcherService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsSearcherComponent implements OnInit {
    @Input()
    partyID?: PartyID;

    isLoading$ = this.fetchPaymentsService.isLoading$;
    doAction$ = this.fetchPaymentsService.doAction$;
    payments$ = this.fetchPaymentsService.searchResult$;
    hasMore$ = this.fetchPaymentsService.hasMore$;
    initSearchParams$ = this.paymentsSearchFiltersStore.data$;

    constructor(
        private router: Router,
        private fetchPaymentsService: FetchPaymentsService,
        private paymentsSearchFiltersStore: PaymentsSearchFiltersStore,
        private partyPaymentsService: PaymentsSearcherService,
        private snackBar: MatSnackBar
    ) {
        this.partyPaymentsService.paymentNavigationLink$.subscribe((link) => {
            this.router.navigate([link]);
        });
        this.partyPaymentsService.searchParamsChanges$.subscribe((params) => {
            this.fetchPaymentsService.search({
                ...params,
                partyID: params.partyID ? params.partyID : this.partyID,
            });
            this.paymentsSearchFiltersStore.preserve({
                ...params,
                partyID: params.partyID ? params.partyID : this.partyID,
            });
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

    searchParamsChanges(params: SearchFiltersParams) {
        this.partyPaymentsService.searchParamsChanges({
            ...params,
            partyID: params.partyID ? params.partyID : this.partyID,
        });
    }

    navigateToPayment(params: NavigationParams) {
        this.partyPaymentsService.updatePaymentNavigationLink({
            ...params,
            partyID: params.partyID ? params.partyID : this.partyID,
        });
    }
}
