import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService } from '../../app-auth-guard.service';
import { SearchPaymentsComponent } from './search-payments.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: SearchPaymentsComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: ['get_claims'],
                },
            },
        ]),
    ],
    exports: [RouterModule],
})
export class SearchPaymentsRoutingModule {}
