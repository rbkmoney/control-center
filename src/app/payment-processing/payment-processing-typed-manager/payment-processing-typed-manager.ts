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

}
