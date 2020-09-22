import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { InvoiceID, InvoicePaymentID } from '../../../thrift-services/damsel/gen-model/domain';
import { StatPayment } from '../../../thrift-services/damsel/gen-model/merch_stat';
import { NavigationParams } from '../navigation-params';

@Component({
    selector: 'cc-payments-table',
    templateUrl: 'payments-table.component.html',
    styleUrls: ['payments-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsTableComponent {
    @Input()
    partyID: string;

    @Input()
    payments: StatPayment[];

    @Output()
    goToPaymentDetails = new EventEmitter<NavigationParams>();

    displayedColumns: string[] = ['amount', 'status', 'createdAt', 'shop', 'actions'];

    navigateToPayment(invoiceID: InvoiceID, paymentID: InvoicePaymentID) {
        this.goToPaymentDetails.emit({ partyID: this.partyID, invoiceID, paymentID });
    }
}
