import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import * as Invoicing from './gen-nodejs/Invoicing';
import { ThriftService } from './thrift-service';

@Injectable()
export class PaymentProcessingService extends ThriftService {

    constructor(zone: NgZone) {
        super(zone, '/v1/processing/invoicing', Invoicing);
    }

    createPaymentAdjustment: (user: any, id: string, paymentId: string, params: any) => Observable<any>
        = this.toObservableAction(this.client.CreatePaymentAdjustment.bind(this.client));

    capturePaymentAdjustment: (user: any, id: string, paymentId: string, adjustmentId: string) => Observable<any>
        = this.toObservableAction(this.client.CapturePaymentAdjustment.bind(this.client));

    cancelPaymentAdjustment: (user: any, id: string, paymentId: string, adjustmentId: string) => Observable<any>
        = this.toObservableAction(this.client.CancelPaymentAdjustment.bind(this.client));
}
