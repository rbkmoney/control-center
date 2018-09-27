import { InvoicePaymentAdjustmentParams, UserInfo } from '../../gen-damsel/payment_processing';
import * as PaymentProcessingTypes from '../gen-nodejs/payment_processing_types';

export const toGenPaymentProcessing = (user: UserInfo) => {
    return new PaymentProcessingTypes.UserInfo(user);
};

export const toGenInvoicePaymentAdjustmentParams = (params: InvoicePaymentAdjustmentParams) => {
    const result = new PaymentProcessingTypes.InvoicePaymentAdjustmentParams(params);
    result.domain_revision = params.domainRevision;
    result.reason = params.reason;
    return result;
};
