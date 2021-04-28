import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService, DomainConfigRole } from '@cc/app/shared/services';

import { ShopPaymentRoutingRulesetComponent } from './shop-payment-routing-ruleset.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: ':partyRefID/shop-ruleset/:refID',
                component: ShopPaymentRoutingRulesetComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: [DomainConfigRole.Checkout],
                },
            },
        ]),
    ],
})
export class ShopPaymentRoutingRulesetRoutingModule {}
