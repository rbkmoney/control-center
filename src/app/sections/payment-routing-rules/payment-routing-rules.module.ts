import { NgModule } from '@angular/core';

import { PartyDelegateRulesetsModule } from './party-delegate-rulesets';
import { PartyPaymentRoutingRulesetModule } from './party-payment-routing-ruleset';
import { ShopPaymentRoutingRulesetModule } from './shop-payment-routing-ruleset';

@NgModule({
    imports: [
        PartyDelegateRulesetsModule,
        PartyPaymentRoutingRulesetModule,
        ShopPaymentRoutingRulesetModule,
    ],
})
export class PaymentRoutingRulesModule {}
