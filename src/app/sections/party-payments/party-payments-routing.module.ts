import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService } from '../../app-auth-guard.service';
import { PartyPaymentsComponent } from './party-payments.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: PartyPaymentsComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: ['get_claims'],
                },
            },
        ]),
    ],
})
export class PartyPaymentsRoutingModule {}
