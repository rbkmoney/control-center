import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DomainComponent } from './domain.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'domain',
                component: DomainComponent
            }
        ])
    ],
    exports: [RouterModule]
})
export class DomainRoutingModule {}
