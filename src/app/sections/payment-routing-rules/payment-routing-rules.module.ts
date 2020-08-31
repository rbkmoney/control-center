import { NgModule } from '@angular/core';

import { PartyPaymentRoutingRulesetModule } from './party-payment-routing-ruleset';
import { ShopPaymentRoutingRulesetModule } from './shop-payment-routing-ruleset';

@NgModule({
    imports: [PartyPaymentRoutingRulesetModule, ShopPaymentRoutingRulesetModule],
})
export class PaymentRoutingRulesModule {}
