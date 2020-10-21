import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService } from '@cc/app/shared/services';

import { ShopPaymentRoutingRulesetComponent } from './shop-payment-routing-ruleset.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: ':partyRefID/shop-ruleset/:refID',
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
