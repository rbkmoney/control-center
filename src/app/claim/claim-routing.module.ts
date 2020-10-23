import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService, ClaimManagementRole } from '@cc/app/shared/services';

import { ClaimComponent } from './claim.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'claims/:party_id/:action/:claim_id',
                component: ClaimComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: [ClaimManagementRole.GetClaims],
                },
            },
            {
                path: 'claims/:party_id/:action',
                component: ClaimComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: [ClaimManagementRole.GetClaims],
                },
            },
        ]),
    ],
    exports: [RouterModule],
})
export class ClaimRoutingModule {}
