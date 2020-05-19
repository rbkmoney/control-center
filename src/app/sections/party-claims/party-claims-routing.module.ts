import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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
                    roles: ['get_claims'],
                },
            },
        ]),
    ],
})
export class PartyClaimsRoutingModule {}
