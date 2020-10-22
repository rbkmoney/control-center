import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService } from '../../app-auth-guard.service';
import { MerchantsComponent } from './merchants.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'merchants',
                component: MerchantsComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: ['get_claims'],
                },
            },
        ]),
    ],
    exports: [RouterModule],
})
export class MerchantsRoutingModule {}
