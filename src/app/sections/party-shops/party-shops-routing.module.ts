import { NgModule } from '@angular/core';
import { AppAuthGuardService } from '../../app-auth-guard.service';
import { RouterModule } from '@angular/router';
import { PartyShopsComponent } from './party-shops.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'party/:partyID/shops',
                component: PartyShopsComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: ['get_claims']
                }
            }
        ])
    ]
})
export class PartyShopsRoutingModule {}
