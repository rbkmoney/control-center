import { NgModule } from '@angular/core';
import { AppAuthGuardService } from '../../app-auth-guard.service';
import { RouterModule } from '@angular/router';
import { PartyClaimsComponent } from './party-claims.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'party/:partyID/claims',
                component: PartyClaimsComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: ['get_claims']
                }
            }
        ])
    ]
})
export class PartyClaimsRoutingModule {}
