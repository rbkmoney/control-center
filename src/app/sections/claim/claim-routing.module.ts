import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService } from '../../app-auth-guard.service';
import { ClaimComponent } from './claim.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: ClaimComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: ['get_claims'],
                },
            },
        ]),
    ],
})
export class ClaimRoutingModule {}
