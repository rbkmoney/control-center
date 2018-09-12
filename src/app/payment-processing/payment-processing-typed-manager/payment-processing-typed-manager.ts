import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PaymentProcessingService } from '../payment-processing.service';
import { InvoicePaymentAdjustmentParams, UserInfo } from '../../damsel';
import { InvoicePaymentAdjustment } from '../../damsel/domain/invoice-payment-adjustment';
import { toGenInvoicePaymentAdjustmentParams, toGenPaymentProcessing } from './gen-conversation';

@Injectable()
export class PaymentProcessingTypedManager {

    constructor(private paymentProcessingService: PaymentProcessingService) {
    }

    createPaymentAdjustment(user: UserInfo, id: string, paymentId: string, params: InvoicePaymentAdjustmentParams): Observable<InvoicePaymentAdjustment> {
        return this.paymentProcessingService.createPaymentAdjustment(toGenPaymentProcessing(user), id, paymentId, toGenInvoicePaymentAdjustmentParams(params));
    }

    capturePaymentAdjustment(user: UserInfo, id: string, paymentId: string, adjustmentId: string): Observable<void> {
        return this.paymentProcessingService.capturePaymentAdjustment(toGenPaymentProcessing(user), id, paymentId, adjustmentId);
    }

    cancelPaymentAdjustment(user: UserInfo, id: string, paymentId: string, adjustmentId: string): Observable<void> {
        return this.paymentProcessingService.cancelPaymentAdjustment(toGenPaymentProcessing(user), id, paymentId, adjustmentId);
    }

}
