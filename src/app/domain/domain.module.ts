import { NgModule } from '@angular/core';

import { DamselMetaModule } from '../damsel-meta/damsel-meta.module';
import { DomainInfoModule } from './domain-info/domain-info.module';
import { DomainObjModificationModule } from './domain-obj-modification';
import { DomainObjReviewModule } from './domain-obj-review';
import { DomainReviewService } from './domain-review.service';
import { DomainRoutingModule } from './domain-routing.module';
import { DomainService } from './domain.service';
import { MetadataService } from './metadata.service';

@NgModule({
    imports: [
        DomainRoutingModule,
        DomainInfoModule,
        DomainObjModificationModule,
        DomainObjReviewModule,
        DamselMetaModule,
    ],
    providers: [DomainService, MetadataService, DomainReviewService],
})
export class DomainModule {}
