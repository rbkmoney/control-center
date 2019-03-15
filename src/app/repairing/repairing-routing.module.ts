import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RepairingComponent } from './repairing.component';
import { AppAuthGuardService } from '../app-auth-guard.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'repairing',
                component: RepairingComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: []
                }
            }
        ])
    ],
    exports: [RouterModule]
})
export class RepairingRoutingModule {}
