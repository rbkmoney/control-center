import {
    InvoiceID,
    InvoicePaymentID,
    PartyID,
} from '../../thrift-services/damsel/gen-model/domain';

export interface NavigationParams {
    partyID: PartyID;
    invoiceID: InvoiceID;
    paymentID: InvoicePaymentID;
}
