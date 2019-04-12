import { NgModule } from '@angular/core';

import { DefinitionService } from './definition.service';
import { MetaBuilderService } from './meta-builder.service';

@NgModule({
    providers: [DefinitionService, MetaBuilderService]
})
export class DamselMetaModule {}
