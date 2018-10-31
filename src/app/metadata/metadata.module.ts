import { NgModule } from '@angular/core';

import { MetadataConfigService } from './metadata-config.service';
import { MetadataService } from './metadata.service';

@NgModule({
    providers: [
        MetadataConfigService,
        MetadataService
    ]
})
export class MetadataModule { }

export * from './metadata-config.service';
export * from './metadata.service';
