import { Pipe, PipeTransform } from '@angular/core';

import { PaymentTool, StatPayment } from '../../thrift-services/damsel/gen-model/merch_stat';

@Pipe({
    name: 'toPaymentTool',
})
export class ToPaymentToolPipe implements PipeTransform {
    transform(payment: StatPayment): PaymentTool {
        return toPaymentTool(payment);
    }
}

export const toPaymentTool = (payment: StatPayment): PaymentTool =>
    payment.payer?.customer?.payment_tool ||
    payment.payer?.payment_resource?.payment_tool ||
    payment.payer?.recurrent?.payment_tool;
