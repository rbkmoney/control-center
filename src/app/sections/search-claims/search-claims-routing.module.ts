import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClaimManagementRole } from '@cc/app/shared/services';

import { AppAuthGuardService } from '../../app-auth-guard.service';
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
