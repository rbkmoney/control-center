import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService } from '@cc/app/shared/services';

import { PaymentRoutingRulesComponent } from './party-payment-routing-ruleset.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: ':partyRefID',
                component: PaymentRoutingRulesComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: [],
                },
            },
        ]),
    ],
})
export class PartyPaymentRoutingRulesetRoutingModule {}
