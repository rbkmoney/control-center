import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService } from '../../app-auth-guard.service';
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
