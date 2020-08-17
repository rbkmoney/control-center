import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService } from '../../app-auth-guard.service';
import { PaymentRoutingRulesComponent } from './payment-routing-rules.component';
import { ShopPaymentRoutingRulesetComponent } from './shop-payment-routing-ruleset';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: ':refID',
                component: ShopPaymentRoutingRulesetComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: [],
                },
            },
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
