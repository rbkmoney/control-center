import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService, ChargebackRole } from '@cc/app/shared/services';

import { ChargebackDetailsComponent } from './chargeback-details.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: ChargebackDetailsComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: [ChargebackRole.Manage],
                },
            },
        ]),
    ],
})
export class ChargebackDetailsRoutingModule {}
