import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DomainComponent } from './domain.component';
import { AppAuthGuardService } from '../app-auth-guard.service';
import { DomainObjModificationComponent } from './domain-obj-modification';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'domain',
                component: DomainComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: ['dmt:checkout']
                }
            },
            {
                path: 'domain/:ref',
                component: DomainObjModificationComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: ['dmt:checkout']
                }
            }
        ])
    ],
    exports: [RouterModule]
})
export class DomainRoutingModule {}
