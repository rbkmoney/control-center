import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService } from '../../app-auth-guard.service';
import { OperationsComponent } from './operations.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'operations',
                component: OperationsComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: ['get_claims'],
                },
                children: [
                    {
                        path: 'payments',
                        loadChildren: () =>
                            import('../search-payments').then((m) => m.SearchPaymentsModule),
                        canActivate: [AppAuthGuardService],
                        data: {
                            roles: ['get_claims'],
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
