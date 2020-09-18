import { Pipe, PipeTransform } from '@angular/core';

import { Payer, PaymentTool } from '../../../thrift-services/damsel/gen-model/merch_stat';

@Pipe({
    name: 'toPaymentTool',
})
export class ToPaymentToolPipe implements PipeTransform {
    transform(payer: Payer): PaymentTool {
        return toPaymentTool(payer);
    }
}

export const toPaymentTool = (payer: Payer): PaymentTool =>
    payer?.customer?.payment_tool ||
    payer?.payment_resource?.payment_tool ||
    payer?.recurrent?.payment_tool;
