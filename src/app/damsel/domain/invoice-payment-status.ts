import { OperationFailure } from './operation-failure';

export interface InvoicePaymentStatus {
    pending?: {};
    processed: {};
    captured: { reason?: string };
    cancelled: { reason?: string };
    refunded: {};
    failed: { failure: OperationFailure };
}
