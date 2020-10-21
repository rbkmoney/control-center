import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService, PartyRole } from '@cc/app/shared/services';

import { PartiesComponent } from './parties.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'parties',
                component: PartiesComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: [PartyRole.Get],
                },
            },
        ]),
    ],
    exports: [RouterModule],
})
export class PartiesRoutingModule {}
