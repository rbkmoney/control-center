import { Component, Input } from '@angular/core';
import { TCreatedPdf } from 'pdfmake/build/pdfmake';
import { Observable, of } from 'rxjs';

import { Questionary } from '../../../../thrift-services/ank/gen-model/questionary_manager';
import { QuestionaryDocumentService } from '../../../../questionary-document';
import { getUnionValue } from '../../../../shared/utils';

@Component({
    selector: 'cc-questionary',
    templateUrl: 'questionary.component.html',
    styleUrls: ['questionary.component.scss']
})
export class QuestionaryComponent {
    private _questionary: Questionary;
    beneficialOwnersDocuments$: Observable<TCreatedPdf[]>;

    @Input()
    set questionary(questionary) {
        this._questionary = questionary;
        this.beneficialOwnersDocuments$ = this.questionaryDocumentService.createBeneficialOwnerDocs(
            this.questionary
        );
    }
    get questionary() {
        return this._questionary;
    }

    get entity() {
        return getUnionValue(getUnionValue(this.questionary.data.contractor));
    }

    constructor(private questionaryDocumentService: QuestionaryDocumentService) {}

    downloadDocument() {
        this.questionaryDocumentService
            .createDoc(this.questionary)
            .subscribe(doc => doc.download('russian-entity-questionary'));
    }

    downloadBeneficialOwnerDocument(beneficialOwnerDocument: TCreatedPdf) {
        beneficialOwnerDocument.download('beneficial-owner-questionary');
    }
}
