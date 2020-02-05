import { Component, Input } from '@angular/core';
import { TCreatedPdf } from 'pdfmake/build/pdfmake';
import { Observable, of } from 'rxjs';

import { Questionary } from '../../../../thrift-services/ank/gen-model/questionary_manager';
import { QuestionaryDocumentService } from '../../../../questionary-document';
import { getUnionValue } from '../../../../shared/utils';
import { BeneficialOwner } from '../../../../thrift-services/ank/gen-model/questionary';
import { getCompanyInfo } from '../../../../questionary-document/select-data';

@Component({
    selector: 'cc-questionary',
    templateUrl: 'questionary.component.html',
    styleUrls: ['questionary.component.scss']
})
export class QuestionaryComponent {
    beneficialOwnersDocuments$: Observable<TCreatedPdf[]>;

    @Input()
    questionary: Questionary;

    get entity() {
        return getUnionValue(getUnionValue(this.questionary.data.contractor));
    }

    constructor(private questionaryDocumentService: QuestionaryDocumentService) {}

    downloadDocument() {
        this.questionaryDocumentService
            .createDoc(this.questionary)
            .subscribe(doc => doc.download('russian-entity-questionary'));
    }

    downloadBeneficialOwnerDocument(beneficialOwner: BeneficialOwner) {
        const { companyName, companyInn } = getCompanyInfo(this.questionary);
        this.questionaryDocumentService
            .createBeneficialOwnerDoc(beneficialOwner, companyName, companyInn)
            .subscribe(doc => doc.download('beneficial-owner-questionary'));
    }
}
