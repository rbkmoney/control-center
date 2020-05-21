import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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
                    roles: ['get_claims'],
                },
            },
        ]),
    ],
    exports: [RouterModule],
})
export class SearchClaimsComponentRouting {}
