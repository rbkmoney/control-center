import { Component, Input } from '@angular/core';
import { TCreatedPdf } from 'pdfmake/build/pdfmake';
import { Observable, of } from 'rxjs';

import { Questionary } from '../../../../thrift-services/ank/gen-model/questionary_manager';
import { QuestionaryDocumentService } from '../../../../questionary-document';

@Component({
    selector: 'cc-questionary',
    templateUrl: 'questionary.component.html',
    styleUrls: ['questionary.component.scss']
})
export class QuestionaryComponent {
    _questionary: Questionary;
    beneficialOwnersDocuments$: Observable<TCreatedPdf[]>;

    @Input()
    set questionary(questionary) {
        this._questionary = questionary;
        this.beneficialOwnersDocuments$ = questionary
            ? this.questionaryDocumentService.createBeneficialOwnerDocs(this.questionary)
            : of([]);
    }
    get questionary() {
        return this._questionary;
    }

    get contractor() {
        return this.questionary.data.contractor.individual_entity
            ? this.questionary.data.contractor.individual_entity.russian_individual_entity
            : this.questionary.data.contractor.legal_entity.russian_legal_entity;
    }

    get legalOwnerInfo() {
        return this.questionary.data.contractor.legal_entity
            ? this.questionary.data.contractor.legal_entity.russian_legal_entity.legal_owner_info
            : null;
    }

    get individualEntity() {
        return this.questionary.data.contractor.individual_entity
            ? this.questionary.data.contractor.individual_entity.russian_individual_entity
            : null;
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
