import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService } from '../app-auth-guard.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'claim-mgt', redirectTo: 'claim-mgt/claims', pathMatch: 'full' },
            {
                path: 'claim-mgt/claims',
                loadChildren: () => import('./claims').then((m) => m.ClaimsModule),
                canActivate: [AppAuthGuardService],
                data: {
                    roles: ['get_claims'],
                },
            },
            {
                path: 'claim-mgt/party',
                loadChildren: () => import('./claim').then((m) => m.ClaimModule),
                canActivate: [AppAuthGuardService],
                data: {
                    roles: ['get_claims'],
                },
            },
        ]),
    ],
    exports: [RouterModule],
})
export class ClaimMgtRouting {}
