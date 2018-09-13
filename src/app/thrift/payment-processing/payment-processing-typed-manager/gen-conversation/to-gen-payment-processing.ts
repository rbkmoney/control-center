import { UserInfo } from '../../../../damsel/payment-processing/index';
import * as PaymentProcessingTypes from '../../../gen-nodejs/payment_processing_types';
import { InvoicePaymentAdjustmentParams } from '../../../../damsel/index';

export const toGenPaymentProcessing = (user: UserInfo) => {
    return new PaymentProcessingTypes.UserInfo(user);
};

export const toGenInvoicePaymentAdjustmentParams = (params: InvoicePaymentAdjustmentParams) => {
    return new PaymentProcessingTypes.InvoicePaymentAdjustmentParams(params);
};
