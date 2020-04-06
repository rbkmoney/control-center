import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService } from '../app-auth-guard.service';
import { PayoutsComponent } from './payouts.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'payouts',
                component: PayoutsComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: ['payout:read']
                }
            }
        ])
    ],
    exports: [RouterModule]
})
export class PayoutsRoutingModule {}
