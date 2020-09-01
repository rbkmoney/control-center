import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService } from '../../../app-auth-guard.service';
import { ShopPaymentRoutingRulesetComponent } from './shop-payment-routing-ruleset.component';

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
        ]),
    ],
})
export class ShopPaymentRoutingRulesetRoutingModule {}
