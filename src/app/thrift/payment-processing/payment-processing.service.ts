import { Observable } from 'rxjs';

import { createHttpClient, PaymentProcessingClient } from './payment-processing-connector';
import { InvoicePaymentAdjustmentParams, UserInfo, InvoicePaymentAdjustment } from '../../damsel';
import * as Invoicing from '../gen-nodejs/Invoicing';
import { ThriftService } from '../thrift-service';

export class PaymentProcessingService extends ThriftService {

    private paymentProcessingClient: PaymentProcessingClient = createHttpClient(Invoicing);

    createPaymentAdjustment: (user: UserInfo, id: string, paymentId: string, params: InvoicePaymentAdjustmentParams) => Observable<InvoicePaymentAdjustment>
        = this.toObservableAction(this.paymentProcessingClient.CreatePaymentAdjustment.bind(this.paymentProcessingClient));

    capturePaymentAdjustment: (user: UserInfo, id: string, paymentId: string, adjustmentId: string) => Observable<void>
        = this.toObservableAction(this.paymentProcessingClient.CapturePaymentAdjustment.bind(this.paymentProcessingClient));

    cancelPaymentAdjustment: (user: UserInfo, id: string, paymentId: string, adjustmentId: string) => Observable<void>
        = this.toObservableAction(this.paymentProcessingClient.CancelPaymentAdjustment.bind(this.paymentProcessingClient));
}
