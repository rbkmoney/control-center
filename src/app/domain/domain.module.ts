import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material';

import { DomainRoutingModule } from './domain-routing.module';
import { DomainComponent } from './domain.component';

@NgModule({
    imports: [
        DomainRoutingModule,
        MatCardModule
    ],
    declarations: [
        DomainComponent
    ]
})
export class DomainModule {
}
