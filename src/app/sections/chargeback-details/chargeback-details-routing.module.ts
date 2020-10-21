import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService } from '@cc/app/shared/services';

import { ChargebackDetailsComponent } from './chargeback-details.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: ChargebackDetailsComponent,
                canActivate: [AppAuthGuardService],
            },
        ]),
    ],
})
export class ChargebackDetailsRoutingModule {}
