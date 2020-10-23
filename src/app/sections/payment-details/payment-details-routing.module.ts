import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService, OperationRole } from '@cc/app/shared/services';

import { PaymentDetailsComponent } from './payment-details.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: PaymentDetailsComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: [OperationRole.SearchPayments],
                },
            },
        ]),
    ],
})
export class PaymentDetailsRoutingModule {}
