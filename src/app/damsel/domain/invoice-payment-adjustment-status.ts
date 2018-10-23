export interface InvoicePaymentAdjustmentStatus {
    pending: {};
    captured: { at: string };
    cancelled: { at: string };
}
