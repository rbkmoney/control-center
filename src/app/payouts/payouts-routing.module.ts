import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService } from '@cc/app/shared/services';

import { PayoutsComponent } from './payouts.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'payouts',
                component: PayoutsComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: ['payout:read'],
                },
            },
        ]),
    ],
    exports: [RouterModule],
})
export class PayoutsRoutingModule {}
