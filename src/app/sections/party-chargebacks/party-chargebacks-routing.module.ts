import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService } from '@cc/app/shared/services';

import { PartyChargebacksComponent } from './party-chargebacks.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: PartyChargebacksComponent,
                canActivate: [AppAuthGuardService],
            },
        ]),
    ],
})
export class PartyChargebacksRoutingModule {}
