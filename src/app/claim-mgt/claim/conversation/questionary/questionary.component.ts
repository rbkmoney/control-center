import { Component, Input } from '@angular/core';

import { Questionary } from '../../../../thrift-services/ank/gen-model/questionary_manager';
import { QuestionaryDocumentService } from '../../../../questionary-document';
import { TCreatedPdf } from 'pdfmake/build/pdfmake';

@Component({
    selector: 'cc-questionary',
    templateUrl: 'questionary.component.html',
    styleUrls: ['questionary.component.scss']
})
export class QuestionaryComponent {
    @Input() questionary: Questionary;

    get beneficialOwnersDocuments$() {
        return this.questionary
            ? this.questionaryDocumentService.createBeneficialOwnerDocs(this.questionary)
            : null;
    }

    get document$() {
        return this.questionary
            ? this.questionaryDocumentService.createDoc(this.questionary)
            : null;
    }

    constructor(private questionaryDocumentService: QuestionaryDocumentService) {}

    downloadDocument() {
        return (
            this.document$ ||
            this.document$.subscribe(doc => doc.download('russian-entity-questionary'))
        );
    }

    downloadBeneficialOwnerDocument(beneficialOwnerDocument: TCreatedPdf) {
        beneficialOwnerDocument.download('beneficial-owner-questionary');
    }
}
