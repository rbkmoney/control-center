import { PaymentActions } from '@cc/app/shared/components/payments-table/payment-actions';

import { InvoiceID, InvoicePaymentID } from '../../../thrift-services/damsel/gen-model/domain';
import { PartyID } from '../../../thrift-services/damsel/gen-model/walker';

export interface PaymentMenuItemEvent {
    action: PaymentActions;
    paymentID: InvoicePaymentID;
    invoiceID: InvoiceID;
    partyID: PartyID;
}
