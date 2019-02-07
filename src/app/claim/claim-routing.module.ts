import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClaimComponent } from './claim.component';
import { AppAuthGuardService } from '../app-auth-guard.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'claims/:partyID/:action/:claimId',
                component: ClaimComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: ['claim:get']
                }
            },
            {
                path: 'claims/:partyID/:action',
                component: ClaimComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: ['claim:get']
                }
            }
        ])
    ],
    exports: [RouterModule]
})
export class ClaimRoutingModule {}
