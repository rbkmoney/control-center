import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DomainAuthGuardService } from './domain-auth-guard.service';
import { DomainComponent } from './domain.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'domain',
                component: DomainComponent,
                canActivate: [DomainAuthGuardService],
                data: {
                    roles: ['dmt:checkout', 'dmt:commit', 'dmt:pull']
                }
            }
        ])
    ],
    exports: [
        RouterModule
    ],
    providers: [
        DomainAuthGuardService
    ]
})
export class DomainRoutingModule {
}
