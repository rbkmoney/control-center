import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService } from '../../app-auth-guard.service';
import { PaymentDetailsComponent } from './payment-details.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: PaymentDetailsComponent,
                canActivate: [AppAuthGuardService],
            },
        ]),
    ],
})
export class PaymentDetailsRoutingModule {}
