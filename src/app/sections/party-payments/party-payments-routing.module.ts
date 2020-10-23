import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService, OperationRole } from '@cc/app/shared/services';

import { PartyPaymentsComponent } from './party-payments.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: PartyPaymentsComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: [OperationRole.SearchPayments],
                },
            },
        ]),
    ],
})
export class PartyPaymentsRoutingModule {}
