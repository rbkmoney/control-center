import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService } from '../../app-auth-guard.service';
import { ClaimComponent } from './claim.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: ':party_id/claim/:claim_id',
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
