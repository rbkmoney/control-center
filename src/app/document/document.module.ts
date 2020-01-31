import { NgModule } from '@angular/core';

import { DocumentService } from './document.service';
import { FontsService } from './fonts';

@NgModule({
    providers: [DocumentService, FontsService]
})
export class DocumentModule {}
