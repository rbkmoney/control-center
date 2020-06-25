import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService } from '../../app-auth-guard.service';
import { PartyClaimComponent } from './party-claim.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: PartyClaimComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: ['get_claims'],
                },
            },
        ]),
    ],
})
export class PartyClaimRoutingModule {}
