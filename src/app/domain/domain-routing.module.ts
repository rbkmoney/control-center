import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppAuthGuardService } from '../app-auth-guard.service';
import { DomainComponent } from './domain.component';
import { ObjectComponent } from './object/object.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'domain',
                component: DomainComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: ['dmt:checkout', 'dmt:commit', 'dmt:pull']
                }
            },
            {
                path: 'domain/object/:ref',
                component: ObjectComponent,
                canActivate: [AppAuthGuardService],
                data: {
                    roles: ['dmt:checkout', 'dmt:commit', 'dmt:pull']
                }
            },
        ])
    ]
})
export class DomainRoutingModule {
}
