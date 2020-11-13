import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { InvoiceID, InvoicePaymentID } from '../../../thrift-services/damsel/gen-model/domain';
import { FetchRefundsService } from './fetch-refunds.service';

@Component({
    selector: 'cc-payment-refunds',
    templateUrl: 'payment-refunds.component.html',
})
export class PaymentRefundsComponent implements OnInit {
    @Input() paymentID: InvoicePaymentID;
    @Input() invoiceID: InvoiceID;

    doAction$ = this.fetchRefundsService.doAction$;
    isLoading$ = this.fetchRefundsService.isLoading$;
    hasMore$ = this.fetchRefundsService.hasMore$;
    refunds$ = this.fetchRefundsService.searchResult$;

    constructor(private fetchRefundsService: FetchRefundsService, private snackBar: MatSnackBar) {}

    ngOnInit() {
        this.fetchRefundsService.search({
            paymentID: this.paymentID,
            invoiceID: this.invoiceID,
        });
        this.fetchRefundsService.errors$.subscribe((e) =>
            this.snackBar.open(`An error occurred while search refunds (${e})`, 'OK')
        );
    }

    fetchMore() {
        this.fetchRefundsService.fetchMore();
    }
}
