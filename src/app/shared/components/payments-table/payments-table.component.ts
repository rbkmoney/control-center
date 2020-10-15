import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';

import {
    InvoiceID,
    InvoicePaymentID,
    PartyID,
} from '../../../thrift-services/damsel/gen-model/domain';
import { StatPayment } from '../../../thrift-services/damsel/gen-model/merch_stat';
import { PaymentsTableType, TableType } from './payments-table';

@Component({
    selector: 'cc-payments-table',
    templateUrl: 'payments-table.component.html',
    styleUrls: ['payments-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsTableComponent {
    @Input()
    payments: StatPayment[];

    @ViewChild(MatTable) table: MatTable<StatPayment>;

    @Input()
    set type(type: PaymentsTableType) {
        this.displayedColumns = [
            'amount',
            'status',
            'createdAt',
            ...(type.type === TableType.PartyTable ? ['shop'] : []),
            'actions',
        ];
    }

    displayedColumns: string[];

    constructor(private router: Router) {}

    navigateToPayment(invoiceID: InvoiceID, paymentID: InvoicePaymentID, partyID: PartyID) {
        this.router.navigate([`/party/${partyID}/invoice/${invoiceID}/payment/${paymentID}`]);
    }
}
