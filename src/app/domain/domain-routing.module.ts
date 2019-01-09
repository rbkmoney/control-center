import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DomainComponent } from './domain.component';
import { DomainAuthGuardService } from './domain-auth-guard.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'domain',
                component: DomainComponent,
                canActivate: [DomainAuthGuardService]
            }
        ])
    ],
    exports: [RouterModule],
    providers: [DomainAuthGuardService]
})
export class DomainRoutingModule {}
