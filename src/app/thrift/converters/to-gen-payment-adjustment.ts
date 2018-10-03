import { InvoicePaymentAdjustmentParams, UserInfo } from '../../gen-damsel/payment_processing';
import * as PaymentProcessingTypes from '../gen-nodejs/payment_processing_types';

export const toGenPaymentProcessing = (user: UserInfo) => {
    return new PaymentProcessingTypes.UserInfo(user);
};

export const toGenInvoicePaymentAdjustmentParams = (params: InvoicePaymentAdjustmentParams) =>
    new PaymentProcessingTypes.InvoicePaymentAdjustmentParams(params);
