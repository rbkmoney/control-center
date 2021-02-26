import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService, DomainConfigRole } from '@cc/app/shared/services';

import { DomainConfigObjectsComponent } from './domain-config-objects.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: DomainConfigObjectsComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: [DomainConfigRole.Checkout],
                },
            },
        ]),
    ],
})
export class DomainConfigRoutingModule {}
