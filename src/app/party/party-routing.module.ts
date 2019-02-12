import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShopDetailsComponent } from './shop-details/shop-details.component';
import { AppAuthGuardService } from '../app-auth-guard.service';
import { PartyDetailsComponent } from './party-details/party-details.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'party/:partyID',
                component: PartyDetailsComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: ['party:get']
                }
            },
            {
                path: 'party/:partyID/shop/:shopID',
                component: ShopDetailsComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: ['party:get']
                }
            }
        ])
    ],
    exports: [RouterModule]
})
export class PartyRoutingModule {}
