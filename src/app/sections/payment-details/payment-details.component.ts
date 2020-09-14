import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PaymentDetailsService } from './payment-details.service';

@Component({
    templateUrl: 'payment-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [PaymentDetailsService],
})
export class PaymentDetailsComponent {
    payment$ = this.paymentDetailsService.payment$;

    isLoading$ = this.paymentDetailsService.isLoading$;

    shop$ = this.paymentDetailsService.shop$;

    constructor(private paymentDetailsService: PaymentDetailsService) {}
}
