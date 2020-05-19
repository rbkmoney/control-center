import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService } from '../app-auth-guard.service';
import { DepositsComponent } from './deposits.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'deposits',
                component: DepositsComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: ['deposit:write'],
                },
            },
        ]),
    ],
    exports: [RouterModule],
})
export class DepositsRoutingModule {}
