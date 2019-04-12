import { NgModule } from '@angular/core';

import { DomainRoutingModule } from './domain-routing.module';
import { DomainService } from './domain.service';
import { MetadataService } from './metadata.service';
import { DomainObjModificationModule } from './domain-obj-modification';
import { DomainInfoModule } from './domain-info/domain-info.module';
import { DamselMetaModule } from '../damsel-meta/damsel-meta.module';

@NgModule({
    imports: [DomainRoutingModule, DomainInfoModule, DomainObjModificationModule, DamselMetaModule],
    providers: [DomainService, MetadataService]
})
export class DomainModule {}
