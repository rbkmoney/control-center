import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService, PartyRole } from '@cc/app/shared/services';

import { SearchPartiesComponent } from './search-parties.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'parties',
                component: SearchPartiesComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: [PartyRole.Get],
                },
            },
        ]),
    ],
    exports: [RouterModule],
})
export class SearchPartiesRoutingModule {}
