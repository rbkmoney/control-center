import { InvoicePaymentAdjustmentParams, UserInfo } from '../../../gen-damsel/payment_processing';

export interface PaymentAdjustmentCreationParams {
    user: UserInfo;
    invoiceId: string;
    paymentId: string;
    params: InvoicePaymentAdjustmentParams;
}

export interface PaymentAdjustmentCancelParams {
    user: UserInfo;
    invoiceId: string;
    paymentId: string;
    adjustmentId: string;
}

export interface PaymentAdjustmentCaptureParams {
    user: UserInfo;
    invoiceId: string;
    paymentId: string;
    adjustmentId: string;
}
