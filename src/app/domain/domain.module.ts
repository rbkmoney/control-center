import { NgModule } from '@angular/core';

import { DomainRoutingModule } from './domain-routing.module';
import { DomainService } from './domain.service';
import { MetadataLoader } from './metadata-loader';
import { DomainObjModificationModule } from './domain-obj-modification';
import { DomainInfoModule } from './domain-info/domain-info.module';

@NgModule({
    imports: [DomainRoutingModule, DomainInfoModule, DomainObjModificationModule],
    providers: [DomainService, MetadataLoader]
})
export class DomainModule {}
