import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import { createHttpClient, PaymentProcessingClient } from './payment-processing-connector';
import { InvoicePaymentAdjustmentParams, UserInfo } from '../damsel';

import * as Invoicing from './gen-nodejs/Invoicing';
import { InvoicePaymentAdjustment } from '../damsel/domain/invoice-payment-adjustment';

type Exception = any;

@Injectable()
export class PaymentProcessingService {

    private paymentProcessingClient: PaymentProcessingClient = createHttpClient(Invoicing);

    constructor(private zone: NgZone) {
    }

    createPaymentAdjustment(user: UserInfo, id: string, paymentId: string, params: InvoicePaymentAdjustmentParams): Observable<InvoicePaymentAdjustment> {
        return this.toObservableAction(this.paymentProcessingClient.CreatePaymentAdjustment.bind(this.paymentProcessingClient), user, id, paymentId, params);
    }

    capturePaymentAdjustment(user: UserInfo, id: string, paymentId: string, adjustmentId: string): Observable<void> {
        return this.toObservableAction(
            this.paymentProcessingClient.CapturePaymentAdjustment.bind(this.paymentProcessingClient), user, id, paymentId, adjustmentId
        );
    }

    cancelPaymentAdjustment(user: UserInfo, id: string, paymentId: string, adjustmentId: string): Observable<void> {
        return this.toObservableAction(
            this.paymentProcessingClient.CancelPaymentAdjustment.bind(this.paymentProcessingClient), user, id, paymentId, adjustmentId
        );
    }

    toObservableAction(func: Function, ...args: any[]) {
        return Observable.create((observer) =>
            func(...args, (ex: Exception, result) =>
                this.zone.run(() => {
                    ex ? observer.error(ex) : observer.next(result);
                    observer.complete();
                })
            )
        );
    }
}
