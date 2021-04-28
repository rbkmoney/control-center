import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService, DomainConfigRole } from '@cc/app/shared/services';

import { PaymentRoutingRulesComponent } from './party-payment-routing-ruleset.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: ':partyRefID',
                component: PaymentRoutingRulesComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: [DomainConfigRole.Checkout],
                },
            },
        ]),
    ],
})
export class PartyPaymentRoutingRulesetRoutingModule {}
