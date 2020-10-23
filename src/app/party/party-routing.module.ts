import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService, PartyRole } from '@cc/app/shared/services';

import { PartyDetailsComponent } from './party-details/party-details.component';
import { ShopDetailsComponent } from './shop-details/shop-details.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'party-old/:partyID',
                component: PartyDetailsComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: [PartyRole.Get],
                },
            },
            {
                path: 'party-old/:partyID/shop/:shopID',
                component: ShopDetailsComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: [PartyRole.Get],
                },
            },
        ]),
    ],
    exports: [RouterModule],
})
export class PartyRoutingModule {}
