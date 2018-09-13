import { Injectable } from '@angular/core';

import { PaymentProcessingService } from '../payment-processing.service';
import { InvoicePaymentAdjustmentParams, UserInfo } from '../../../damsel/index';
import { toGenInvoicePaymentAdjustmentParams, toGenPaymentProcessing } from './gen-conversation/index';

@Injectable()
export class PaymentProcessingTypedManager {

    constructor(private paymentProcessingService: PaymentProcessingService) {
    }

    createPaymentAdjustment(user: UserInfo, id: string, paymentId: string, params: InvoicePaymentAdjustmentParams) {
        return this.paymentProcessingService.createPaymentAdjustment(toGenPaymentProcessing(user), id, paymentId, toGenInvoicePaymentAdjustmentParams(params));
    }

    capturePaymentAdjustment(user: UserInfo, id: string, paymentId: string, adjustmentId: string) {
        return this.paymentProcessingService.capturePaymentAdjustment(toGenPaymentProcessing(user), id, paymentId, adjustmentId);
    }

    cancelPaymentAdjustment(user: UserInfo, id: string, paymentId: string, adjustmentId: string) {
        return this.paymentProcessingService.cancelPaymentAdjustment(toGenPaymentProcessing(user), id, paymentId, adjustmentId);
    }

}
