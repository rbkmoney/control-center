import { Injectable } from '@angular/core';

import { toGenInvoicePaymentAdjustmentParams, toGenPaymentProcessing } from '../../thrift/converters';
import { PaymentProcessingService } from '../../thrift/payment-processing.service';
import { InvoicePaymentAdjustmentParams, UserInfo } from '../../damsel/payment-processing';

@Injectable()
export class PaymentProcessingTypedManager {

    constructor(private paymentProcessingService: PaymentProcessingService) {
    }

    createPaymentAdjustment(user: UserInfo, id: string, paymentId: string, params: InvoicePaymentAdjustmentParams) {
        const genUser = toGenPaymentProcessing(user);
        const genParams = toGenInvoicePaymentAdjustmentParams(params);
        return this.paymentProcessingService.createPaymentAdjustment(genUser, id, paymentId, genParams);
    }

    capturePaymentAdjustment(user: UserInfo, id: string, paymentId: string, adjustmentId: string) {
        const genUser = toGenPaymentProcessing(user);
        return this.paymentProcessingService.capturePaymentAdjustment(genUser, id, paymentId, adjustmentId);
    }

    cancelPaymentAdjustment(user: UserInfo, id: string, paymentId: string, adjustmentId: string) {
        const genUser = toGenPaymentProcessing(user);
        return this.paymentProcessingService.cancelPaymentAdjustment(genUser, id, paymentId, adjustmentId);
    }

}
