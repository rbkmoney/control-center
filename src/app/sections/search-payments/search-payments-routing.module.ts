import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OperationRole } from '@cc/app/shared/services';

import { AppAuthGuardService } from '../../app-auth-guard.service';
import { SearchPaymentsComponent } from './search-payments.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: SearchPaymentsComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: [OperationRole.SearchPayments],
                },
            },
        ]),
    ],
    exports: [RouterModule],
})
export class SearchPaymentsRoutingModule {}
