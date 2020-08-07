import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService } from '../../app-auth-guard.service';
import { PaymentRoutingRulesComponent } from './payment-routing-rules.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: PaymentRoutingRulesComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: [],
                },
            },
        ]),
    ],
})
export class PaymentRoutingRulesRoutingModule {}
