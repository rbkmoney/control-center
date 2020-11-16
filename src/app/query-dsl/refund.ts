import * as base from '../thrift-services/damsel/gen-model/base';
import {
    Amount,
    InvoiceID,
    InvoicePaymentID,
    InvoicePaymentRefundID,
    PartyID,
    ShopID,
} from '../thrift-services/damsel/gen-model/domain';
import { InvoicePaymentRefundStatus } from '../thrift-services/damsel/gen-model/merch_stat';

export interface Refund {
    id: InvoicePaymentRefundID;
    payment_id: InvoicePaymentID;
    invoice_id: InvoiceID;
    owner_id: PartyID;
    shop_id: ShopID;
    status: InvoicePaymentRefundStatus;
    created_at: base.Timestamp;
    amount: Amount;
    fee: Amount;
    currency_symbolic_code: string;
    external_id?: string;
}
