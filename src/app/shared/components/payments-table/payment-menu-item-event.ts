import { InvoiceID, InvoicePaymentID, PartyID } from '../../../thrift-services/damsel/gen-model/domain';
import { PaymentActions } from './payment-actions';

export interface PaymentMenuItemEvent {
    action: PaymentActions;
    paymentID: InvoicePaymentID;
    invoiceID: InvoiceID;
    partyID: PartyID;
}
