import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService } from '../app-auth-guard.service';
import { WithdrawalsComponent } from './withdrawals.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'withdrawals',
                component: WithdrawalsComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: []
                }
            }
        ])
    ],
    exports: [RouterModule]
})
export class WithdrawalsRoutingModule {}
