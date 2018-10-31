import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClaimComponent } from './claim.component';
import { AppAuthGuardService } from '../app-auth-guard.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'claims/:partyId/:action/:claimId',
                component: ClaimComponent,
                canActivate: [ClaimAuthGuardService]
            }, {
                path: 'claims/:partyId/:action',
                component: ClaimComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: ['claim:get']
                }
            }
        ])
    ]
})
export class ClaimRoutingModule {}
