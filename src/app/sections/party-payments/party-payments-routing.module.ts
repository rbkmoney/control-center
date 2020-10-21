import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OperationRole } from '@cc/app/shared/services';

import { AppAuthGuardService } from '../../app-auth-guard.service';
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
