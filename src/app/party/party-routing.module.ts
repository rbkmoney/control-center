import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShopDetailsComponent } from './shop-details/shop-details.component';
import { AppAuthGuardService } from '../app-auth-guard.service';
import { PartyDetailsComponent } from './party-details/party-details.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'party/:partyId',
                component: PartyDetailsComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: ['party:get']
                }
            },
            {
                path: 'party/:partyId/shop/:shopId',
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
