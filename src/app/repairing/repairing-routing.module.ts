import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppAuthGuardService } from '@cc/app/shared/services';

import { RepairingComponent } from './repairing.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'repairing',
                component: RepairingComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: [],
                },
            },
        ]),
    ],
    exports: [RouterModule],
})
export class RepairingRoutingModule {}
