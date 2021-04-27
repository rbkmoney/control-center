import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppAuthGuardService, ChargebackRole } from '@cc/app/shared/services';

import { PartyChargebacksComponent } from './party-chargebacks.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: PartyChargebacksComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: [ChargebackRole.View],
                },
            },
        ]),
    ],
})
export class PartyChargebacksRoutingModule {}
