import { UserInfo } from '../../../damsel/payment-processing';
import * as PaymentProcessingTypes from '../../gen-nodejs/payment_processing_types';
import { InvoicePaymentAdjustmentParams } from '../../../damsel';

export const toGenPaymentProcessing = (user: UserInfo) => {
    return new PaymentProcessingTypes.UserInfo(user);
};

export const toGenInvoicePaymentAdjustmentParams = (params: InvoicePaymentAdjustmentParams) => {
    return new PaymentProcessingTypes.InvoicePaymentAdjustmentParams(params);
};
