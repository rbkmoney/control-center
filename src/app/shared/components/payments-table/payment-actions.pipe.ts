import { Pipe, PipeTransform } from '@angular/core';

import { PaymentActions } from './payment-actions';

const PAYMENT_ACTION_NAMES: { [N in PaymentActions]: string } = {
    [PaymentActions.NavigateToPayment]: 'Details',
};

@Pipe({
    name: 'ccPaymentActions',
})
export class PaymentActionsPipe implements PipeTransform {
    transform(action: string): string {
        return PAYMENT_ACTION_NAMES[action] || action;
    }
}
