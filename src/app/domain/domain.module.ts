import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material';

import { DomainRoutingModule } from './domain-routing.module';
import { DomainComponent } from './domain.component';
import { DomainService } from './domain.service';
import { MetadataModule } from '../metadata/metadata.module';

@NgModule({
    imports: [
        DomainRoutingModule,
        MatCardModule,
        MetadataModule
    ],
    declarations: [
        DomainComponent
    ],
    providers: [
        DomainService
    ]
})
export class DomainModule {
}
