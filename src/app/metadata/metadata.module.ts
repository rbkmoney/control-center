import { NgModule } from '@angular/core';

import { MetadataService } from './metadata.service';

@NgModule({
    providers: [
        MetadataService
    ]
})
export class MetadataModule { }

export * from './metadata.service';
