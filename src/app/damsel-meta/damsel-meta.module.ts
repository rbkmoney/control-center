import { NgModule } from '@angular/core';

import { DefinitionService } from './definition.service';
import { MetaApplicator } from './meta-applicator.service';
import { MetaBuilder } from './meta-builder.service';
import { ThriftBuilderService } from './thrift-builder.service';

@NgModule({
    providers: [DefinitionService, MetaBuilder, MetaApplicator, ThriftBuilderService],
})
export class DamselMetaModule {}
