import { NgModule } from '@angular/core';

import { PrefixedIdGeneratorService } from './prefixed-id-generator.service';

@NgModule({
    providers: [PrefixedIdGeneratorService],
})
export class PrefixedIdGeneratorModule {}
