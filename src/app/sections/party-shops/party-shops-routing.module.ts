import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PartyRole } from '@cc/app/shared/services';

import { AppAuthGuardService } from '../../app-auth-guard.service';
import { PartyShopsComponent } from './party-shops.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: PartyShopsComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: [PartyRole.Get],
                },
            },
        ]),
    ],
})
export class PartyShopsRoutingModule {}
