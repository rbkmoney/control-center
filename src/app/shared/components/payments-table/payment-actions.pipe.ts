import { Pipe, PipeTransform } from '@angular/core';

import { PaymentActions } from '@cc/app/shared/components/payments-table/payment-actions';

const paymentActionNames: { [N in PaymentActions]: string } = {
    [PaymentActions.navigateToPayment]: 'Details',
};

@Pipe({
    name: 'ccPaymentAction',
})
export class PaymentActionsPipe implements PipeTransform {
    transform(action: string): string {
        return paymentActionNames[action] || action;
    }
}
