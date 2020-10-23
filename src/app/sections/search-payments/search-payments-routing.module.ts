import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService, OperationRole } from '@cc/app/shared/services';

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
