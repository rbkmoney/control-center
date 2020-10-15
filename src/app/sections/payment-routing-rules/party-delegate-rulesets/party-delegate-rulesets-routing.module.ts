import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService } from '../../../app-auth-guard.service';
import { PartyDelegateRulesetsComponent } from './party-delegate-rulesets.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: PartyDelegateRulesetsComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: [],
                },
            },
        ]),
    ],
})
export class PartyDelegateRulesetsRoutingModule {}
