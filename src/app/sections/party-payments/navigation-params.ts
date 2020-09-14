import { InvoiceID, InvoicePaymentID } from '../../thrift-services/damsel/gen-model/domain';

export interface NavigationParams {
    invoiceID: InvoiceID;
    paymentID: InvoicePaymentID;
}
