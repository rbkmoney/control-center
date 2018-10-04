import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { toGenInvoicePaymentAdjustmentParams, toGenPaymentProcessingUserInfo } from './converters';
import { PaymentProcessingService } from './payment-processing.service';
import { InvoicePaymentAdjustment, InvoicePaymentAdjustmentParams, UserInfo } from '../gen-damsel/payment_processing';
import { encode } from '../shared/thrift-js-formatter';

@Injectable()
export class PaymentProcessingTypedManager {

    constructor(private paymentProcessingService: PaymentProcessingService) {
    }

    createPaymentAdjustment(user: UserInfo, id: string, paymentId: string, params: InvoicePaymentAdjustmentParams): Observable<InvoicePaymentAdjustment> {
        const genUser = toGenPaymentProcessingUserInfo(encode(user));
        const genParams = toGenInvoicePaymentAdjustmentParams(encode(params));
        return this.paymentProcessingService.createPaymentAdjustment(genUser, id, paymentId, genParams);
    }

    capturePaymentAdjustment(user: UserInfo, id: string, paymentId: string, adjustmentId: string): Observable<void> {
        const genUser = toGenPaymentProcessingUserInfo(encode(user));
        return this.paymentProcessingService.capturePaymentAdjustment(genUser, id, paymentId, adjustmentId);
    }

    cancelPaymentAdjustment(user: UserInfo, id: string, paymentId: string, adjustmentId: string): Observable<void> {
        const genUser = toGenPaymentProcessingUserInfo(encode(user));
        return this.paymentProcessingService.cancelPaymentAdjustment(genUser, id, paymentId, adjustmentId);
    }

}
