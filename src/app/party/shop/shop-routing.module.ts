import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShopComponent } from './shop.component';
import { AppAuthGuardService } from '../../app-auth-guard.service';

@NgModule({
    imports: [
        RouterModule.forChild([
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
export class ShopRoutingModule {}
