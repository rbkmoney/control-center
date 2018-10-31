import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PayoutsComponent } from './payouts.component';
import { AppAuthGuardService } from '../app-auth-guard.service';

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
    ]
})
export class PayoutsRoutingModule {}
