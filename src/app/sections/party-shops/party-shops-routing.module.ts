import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService, PartyRole } from '@cc/app/shared/services';

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
