import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClaimManagementRole } from '@cc/app/shared/services';

import { AppAuthGuardService } from '../../app-auth-guard.service';
import { PartyClaimsComponent } from './party-claims.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: PartyClaimsComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: [ClaimManagementRole.GetClaims],
                },
            },
        ]),
    ],
})
export class PartyClaimsRoutingModule {}
