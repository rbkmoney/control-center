import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppAuthGuardService, DomainConfigRole } from '@cc/app/shared/services';

import { PartyDelegateRulesetsComponent } from './party-delegate-rulesets.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: PartyDelegateRulesetsComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: [DomainConfigRole.Checkout],
                },
            },
        ]),
    ],
})
export class PartyDelegateRulesetsRoutingModule {}
