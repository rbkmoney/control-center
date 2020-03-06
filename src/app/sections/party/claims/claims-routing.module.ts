import { NgModule } from '@angular/core';
import { AppAuthGuardService } from '../../../app-auth-guard.service';
import { RouterModule } from '@angular/router';
import { ClaimsComponent } from './claims.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: ClaimsComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: ['get_claims']
                }
            }
        ])
    ]
})
export class ClaimsRoutingModule {}
