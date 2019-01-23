import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService } from '../app-auth-guard.service';
import { DomainInfoComponent } from './domain-info';
import { DomainObjModificationComponent } from './domain-obj-modification';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'domain',
                component: DomainInfoComponent,
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
