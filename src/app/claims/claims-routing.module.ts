import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClaimsComponent } from './claims.component';
import { ClaimsAuthGuardService } from './claims-auth-guard.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'claims',
                component: ClaimsComponent,
                canActivate: [ClaimsAuthGuardService]
            }
        ])
    ],
    exports: [
        RouterModule
    ],
    providers: [
        ClaimsAuthGuardService
    ]
})
export class ClaimsRoutingModule {}
