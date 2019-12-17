import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppAuthGuardService } from '../app-auth-guard.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'claims',
                loadChildren: () => import('./claims').then(m => m.ClaimsModule),
                canActivate: [AppAuthGuardService],
                data: {
                    roles: ['claim:get']
                }
            },
            {
                path: 'party',
                loadChildren: () => import('./claim').then(m => m.ClaimModule),
                canActivate: [AppAuthGuardService],
                data: {
                    roles: ['claim:get']
                }
            }
        ])
    ],
    exports: [RouterModule]
})
export class ClaimMgtRouting {}
