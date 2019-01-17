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
                },
                children: [
                    {
                        path: 'shop/:shopId',
                        component: ShopComponent
                    }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class PartyRoutingModule {}
