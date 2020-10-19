import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import { MatTable } from '@angular/material/table';

import { PaymentActions } from '@cc/app/shared/components/payments-table/payment-actions';
import { PaymentMenuItemEvent } from '@cc/app/shared/components/payments-table/payment-menu-item-event';

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

    partyID: string;

    @Input()
    set type(type: PaymentsTableType) {
        this.displayedColumns = [
            'amount',
            'status',
            'createdAt',
            ...(type.type === TableType.PartyTable ? ['shop'] : []),
            'actions',
        ];
        this.partyID = type.partyID;
    }

    @Output()
    menuItemSelected$: EventEmitter<PaymentMenuItemEvent> = new EventEmitter();

    paymentActions = Object.keys(PaymentActions);

    displayedColumns: string[];

    menuItemSelected(
        action: string,
        paymentID: InvoicePaymentID,
        invoiceID: InvoiceID,
        partyID: PartyID
    ) {
        switch (action) {
            case PaymentActions.navigateToPayment:
                this.menuItemSelected$.emit({ action, paymentID, invoiceID, partyID });
                break;
            default:
                console.log('Wrong payment action type.');
        }
    }
}
