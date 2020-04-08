import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService } from '../../app-auth-guard.service';
import { ClaimsComponent } from './claims.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: ClaimsComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: ['get_claims'],
                },
            },
        ]),
    ],
    exports: [RouterModule],
})
export class ClaimsRoutingModule {}
