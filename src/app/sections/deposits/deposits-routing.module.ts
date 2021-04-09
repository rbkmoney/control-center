import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService, OperationRole } from '@cc/app/shared/services';

import { DepositsComponent } from './deposits.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: DepositsComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: [OperationRole.SearchDeposits],
                },
            },
        ]),
    ],
    exports: [RouterModule],
})
export class DepositsRoutingModule {}
