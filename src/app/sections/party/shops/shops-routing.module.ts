import { NgModule } from '@angular/core';
import { AppAuthGuardService } from '../../../app-auth-guard.service';
import { RouterModule } from '@angular/router';
import { ShopsComponent } from './shops.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: ShopsComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: ['get_claims']
                }
            }
        ])
    ]
})
export class ShopsRoutingModule {}
