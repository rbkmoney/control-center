import { NgModule } from '@angular/core';

import { DocumentModule } from '../document';
import { QuestionaryDocumentService } from './questionary-document.service';

@NgModule({
    imports: [DocumentModule],
    providers: [QuestionaryDocumentService],
})
export class QuestionaryDocumentModule {}
