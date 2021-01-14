import {
    InvoicePaymentAdjustmentParams,
    UserInfo,
} from '../../../../thrift-services/damsel/gen-model/payment_processing';

export interface PaymentAdjustmentCreationParams {
    user: UserInfo;
    invoice_id: string;
    payment_id: string;
    params: InvoicePaymentAdjustmentParams;
}

export interface PaymentAdjustmentCancelParams {
    user: UserInfo;
    invoice_id: string;
    payment_id: string;
    adjustment_id: string;
}

export interface PaymentAdjustmentCaptureParams {
    user: UserInfo;
    invoice_id: string;
    payment_id: string;
    adjustment_id: string;
}
