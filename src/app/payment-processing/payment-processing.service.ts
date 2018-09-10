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
        return Observable.create((observer) => {
            this.paymentProcessingClient.CreatePaymentAdjustment(user, id, paymentId, params, (ex: Exception, result) => {
                this.zone.run(() => {
                    ex ? observer.error(ex) : observer.next(result);
                    observer.complete();
                });
            });
        });
    }

    capturePaymentAdjustment(user: UserInfo, id: string, paymentId: string, adjustmentId: string): Observable<void> {
        return Observable.create((observer) => {
            this.paymentProcessingClient.CapturePaymentAdjustment(user, id, paymentId, adjustmentId, (ex: Exception, result) => {
                this.zone.run(() => {
                    ex ? observer.error(ex) : observer.next(result);
                    observer.complete();
                });
            });
        });
    }
}
