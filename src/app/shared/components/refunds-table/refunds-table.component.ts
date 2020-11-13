import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RefundsParams } from '../../../query-dsl';
import { InvoiceID, InvoicePaymentID } from '../../../thrift-services/damsel/gen-model/domain';
import { InvoicePaymentRefundStatus } from '../../../thrift-services/damsel/gen-model/merch_stat';
import { ComponentChanges } from '../../utils/component-changes';
import { FetchRefundsService } from './fetch-refunds.service';

@Component({
    selector: 'cc-refunds-table',
    templateUrl: 'refunds-table.component.html',
    styleUrls: ['refunds-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefundsTableComponent implements OnInit, OnChanges {
    @Input() paymentID: InvoicePaymentID;
    @Input() invoiceID: InvoiceID;
    @Input() searchParams: RefundsParams;
    @Input() displayedColumns = ['createdAt', 'status', 'amount', 'reason'];

    doAction$ = this.fetchRefundsService.doAction$;
    isLoading$ = this.fetchRefundsService.isLoading$;
    hasMore$ = this.fetchRefundsService.hasMore$;
    refunds$ = this.fetchRefundsService.searchResult$;

    mapStatus: { [N in keyof InvoicePaymentRefundStatus] } = {
        pending: 'Pending',
        succeeded: 'Succeeded',
        failed: 'Failed',
    };

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

    ngOnChanges({ searchParams }: ComponentChanges<RefundsTableComponent>) {
        if (searchParams) {
            this.fetchRefundsService.search({
                ...searchParams.currentValue,
                paymentID: this.paymentID,
                invoiceID: this.invoiceID,
            });
        }
    }

    fetchMore() {
        this.fetchRefundsService.fetchMore();
    }
}
