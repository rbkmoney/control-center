import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PartyComponent } from './party.component';
import { PartyAuthGuardService } from './party-auth-guard.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'party/:partyId',
                component: PartyComponent,
                canActivate: [PartyAuthGuardService]
            }
        ])
    ],
    exports: [
        RouterModule
    ],
    providers: [
        PartyAuthGuardService
    ]
})
export class PartyRoutingModule {}
