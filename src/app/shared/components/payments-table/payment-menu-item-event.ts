import { InvoiceID, InvoicePaymentID } from '../../../thrift-services/damsel/gen-model/domain';
import { PartyID } from '../../../thrift-services/damsel/gen-model/walker';
import { PaymentActions } from './payment-actions';

export interface PaymentMenuItemEvent {
    action: PaymentActions;
    paymentID: InvoicePaymentID;
    invoiceID: InvoiceID;
    partyID: PartyID;
}
