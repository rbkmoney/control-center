import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppAuthGuardService, ClaimManagementRole } from '@cc/app/shared/services';

import { PartyClaimComponent } from './party-claim.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: PartyClaimComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: [ClaimManagementRole.GetClaims],
                },
            },
        ]),
    ],
})
export class PartyClaimRoutingModule {}
