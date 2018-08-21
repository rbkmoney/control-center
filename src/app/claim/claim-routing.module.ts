import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClaimComponent } from './claim.component';
import { ClaimAuthGuardService } from './claim-auth-guard.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'claims/:partyId/:claimId',
                component: ClaimComponent,
                canActivate: [ClaimAuthGuardService]
            }
        ])
    ],
    exports: [
        RouterModule
    ],
    providers: [
        ClaimAuthGuardService
    ]
})
export class ClaimRoutingModule {}
