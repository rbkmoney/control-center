import { NgModule } from '@angular/core';

import { DefinitionService } from './definition.service';
import { MetaBuilder } from './meta-builder.service';
import { MetaApplicator } from './meta-applicator.service';

@NgModule({
    providers: [DefinitionService, MetaBuilder, MetaApplicator]
})
export class DamselMetaModule {}
