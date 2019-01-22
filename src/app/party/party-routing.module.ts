import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PartyComponent } from './party.component';
import { AppAuthGuardService } from '../app-auth-guard.service';
import { ShopComponent } from './shop/shop.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'party/:partyId',
                component: PartyComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: ['party:get']
                }
            },
            {
                path: 'party/:partyId/shop/:shopId',
                component: ShopComponent,
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
