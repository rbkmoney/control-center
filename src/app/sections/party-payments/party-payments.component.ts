import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck } from 'rxjs/operators';

import { InvoiceID, InvoicePaymentID } from '../../thrift-services/damsel/gen-model/domain';
import { FetchPaymentsService } from './fetch-payments.service';
import { PaymentsSearchFiltersStore } from './payments-search-filters-store.service';
import { SearchFiltersParams } from './payments-search-filters/search-filters-params';

@Component({
    templateUrl: 'party-payments.component.html',
    styleUrls: ['party-payments.component.scss'],
    providers: [FetchPaymentsService, PaymentsSearchFiltersStore],
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
        private snackBar: MatSnackBar
    ) {}

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

    navigateToPayment({
        invoiceID,
        paymentID,
    }: {
        invoiceID: InvoiceID;
        paymentID: InvoicePaymentID;
    }) {
        this.route.params.pipe(pluck('partyID')).subscribe((partyID) => {
            this.router.navigate([`/party/${partyID}/invoice/${invoiceID}/payment/${paymentID}`]);
        });
    }
}
