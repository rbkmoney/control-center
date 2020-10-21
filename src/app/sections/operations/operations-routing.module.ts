import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService, OperationRole } from '@cc/app/shared/services';

import { OperationsComponent } from './operations.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'operations',
                component: OperationsComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: [OperationRole.SearchOperations],
                },
                children: [
                    {
                        path: 'payments',
                        loadChildren: () =>
                            import('../search-payments').then((m) => m.SearchPaymentsModule),
                        canActivate: [AppAuthGuardService],
                        data: {
                            roles: [OperationRole.SearchPayments],
                        },
                    },
                    { path: '', redirectTo: 'payments', pathMatch: 'full' },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class OperationsRoutingModule {}
