import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService, ClaimManagementRole } from '@cc/app/shared/services';

import { SearchClaimsComponent } from './search-claims.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'claims',
                component: SearchClaimsComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: [ClaimManagementRole.GetClaims],
                },
            },
        ]),
    ],
    exports: [RouterModule],
})
export class SearchClaimsComponentRouting {}
