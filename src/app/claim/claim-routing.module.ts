import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClaimComponent } from './claim.component';
import { AppAuthGuardService } from '../app-auth-guard.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'claims/:party_id/:action/:claim_id',
                component: ClaimComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: ['claim:get']
                }
            },
            {
                path: 'claims/:party_id/:action',
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
