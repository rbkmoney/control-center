import { Injectable } from '@angular/core';

import { toGenInvoicePaymentAdjustmentParams, toGenPaymentProcessing } from '../../thrift/converters';
import { PaymentProcessingService } from '../../thrift/payment-processing.service';
import { InvoicePaymentAdjustmentParams, UserInfo } from '../../gen-damsel/payment_processing';
import { encode } from '../../shared/thrift-js-formatter';

@Injectable()
export class PaymentProcessingTypedManager {

    constructor(private paymentProcessingService: PaymentProcessingService) {
    }

    createPaymentAdjustment(user: UserInfo, id: string, paymentId: string, params: InvoicePaymentAdjustmentParams) {
        const genUser = toGenPaymentProcessing(encode(user));
        const genParams = toGenInvoicePaymentAdjustmentParams(encode(params));
        return this.paymentProcessingService.createPaymentAdjustment(genUser, id, paymentId, genParams);
    }

    capturePaymentAdjustment(user: UserInfo, id: string, paymentId: string, adjustmentId: string) {
        const genUser = toGenPaymentProcessing(encode(user));
        return this.paymentProcessingService.capturePaymentAdjustment(genUser, id, paymentId, adjustmentId);
    }

    cancelPaymentAdjustment(user: UserInfo, id: string, paymentId: string, adjustmentId: string) {
        const genUser = toGenPaymentProcessing(encode(user));
        return this.paymentProcessingService.cancelPaymentAdjustment(genUser, id, paymentId, adjustmentId);
    }

}
