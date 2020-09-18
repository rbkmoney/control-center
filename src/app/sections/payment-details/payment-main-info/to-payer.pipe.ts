import { Pipe, PipeTransform } from '@angular/core';

import { Payer } from '../../../thrift-services/damsel/gen-model/merch_stat';

@Pipe({
    name: 'toPayer',
})
export class ToPayerPipe implements PipeTransform {
    transform(payer: Payer): string {
        return toPayer(payer);
    }
}

export const toPayer = (payer: Payer): string => {
    if (payer.customer) {
        return payer.customer.email;
    }
    if (payer.payment_resource) {
        return payer.payment_resource.email;
    }
    if (payer.recurrent) {
        return payer.recurrent.email;
    }
    return undefined;
};
