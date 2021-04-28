import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService, DepositRole } from '@cc/app/shared/services';

import { DepositDetailsComponent } from './deposit-details.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: DepositDetailsComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: [DepositRole.Write],
                },
            },
        ]),
    ],
})
export class DepositDetailsRoutingModule {}
