import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { NavigationParams } from '@cc/app/shared/components/payments-searcher/navigation-params';

import {
    InvoiceID,
    InvoicePaymentID,
    PartyID,
} from '../../../thrift-services/damsel/gen-model/domain';
import { StatPayment } from '../../../thrift-services/damsel/gen-model/merch_stat';

@Component({
    selector: 'cc-payments-table',
    templateUrl: 'payments-table.component.html',
    styleUrls: ['payments-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsTableComponent {
    @Input()
    payments: StatPayment[];

    @Output()
    goToPaymentDetails = new EventEmitter<NavigationParams>();

    displayedColumns: string[] = ['amount', 'status', 'createdAt', 'shop', 'actions'];

    navigateToPayment(invoiceID: InvoiceID, paymentID: InvoicePaymentID, partyID: PartyID) {
        this.goToPaymentDetails.emit({ partyID, invoiceID, paymentID });
    }
}
