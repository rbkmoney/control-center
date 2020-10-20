import { Pipe, PipeTransform } from '@angular/core';

import { PaymentActions } from './payment-actions';

const paymentActionNames: { [N in PaymentActions]: string } = {
    [PaymentActions.navigateToPayment]: 'Details',
};

@Pipe({
    name: 'ccPaymentActions',
})
export class PaymentActionsPipe implements PipeTransform {
    transform(action: string): string {
        return paymentActionNames[action] || action;
    }
}
