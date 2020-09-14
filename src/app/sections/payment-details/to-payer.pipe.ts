import { Pipe, PipeTransform } from '@angular/core';

import { StatPayment } from '../../thrift-services/damsel/gen-model/merch_stat';

@Pipe({
    name: 'toPayer',
})
export class ToPayerPipe implements PipeTransform {
    transform(payment: StatPayment): string {
        return toPayer(payment);
    }
}

export const toPayer = (payment: StatPayment): string => {
    if (payment.payer.customer) {
        return payment.payer.customer.email;
    }
    if (payment.payer.payment_resource) {
        return payment.payer.payment_resource.email;
    }
    if (payment.payer.recurrent) {
        return payment.payer.recurrent.email;
    }
    return undefined;
};
