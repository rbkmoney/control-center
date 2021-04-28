import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService, PartyRole } from '@cc/app/shared/services';

import { ShopDetailsComponent } from './shop-details.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: ShopDetailsComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: [PartyRole.Get],
                },
            },
        ]),
    ],
})
export class ShopDetailsRoutingModule {}
