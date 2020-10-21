import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService } from '@cc/app/shared/services';

import { ClaimsComponent } from './claims.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'claims-deprecated',
                component: ClaimsComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: ['claim:get'],
                },
            },
        ]),
    ],
    exports: [RouterModule],
})
export class ClaimsRoutingModule {}
