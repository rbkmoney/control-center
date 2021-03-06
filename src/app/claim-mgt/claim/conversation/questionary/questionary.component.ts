import { Component, Input } from '@angular/core';
import get from 'lodash-es/get';
import * as moment from 'moment';
import { TCreatedPdf } from 'pdfmake/build/pdfmake';
import { Observable } from 'rxjs';
import { slugify } from 'transliteration';

import { QuestionaryDocumentService } from '@cc/app/shared/components';
import { getCompanyInfo } from '@cc/app/shared/components/questionary-document/select-data';
import { getUnionValue } from '@cc/utils/get-union-key';

import { BeneficialOwner } from '../../../../thrift-services/ank/gen-model/questionary';
import { Questionary } from '../../../../thrift-services/ank/gen-model/questionary_manager';

const FILENAME_LENGTH = 100;

@Component({
    selector: 'cc-questionary',
    templateUrl: 'questionary.component.html',
    styleUrls: ['questionary.component.scss'],
})
export class QuestionaryComponent {
    beneficialOwnersDocuments$: Observable<TCreatedPdf[]>;

    @Input()
    questionary: Questionary;

    get entity() {
        return getUnionValue(getUnionValue(get(this.questionary, ['data', 'contractor']))) as any;
    }

    constructor(private questionaryDocumentService: QuestionaryDocumentService) {}

    downloadDocument() {
        this.questionaryDocumentService
            .createDoc(this.questionary)
            .subscribe((doc) => doc.download(this.createFilename('Russian entity questionary')));
    }

    downloadBeneficialOwnerDocument(beneficialOwner: BeneficialOwner, idx: number) {
        const { companyName, companyInn } = getCompanyInfo(this.questionary);
        this.questionaryDocumentService
            .createBeneficialOwnerDoc(beneficialOwner, companyName, companyInn)
            .subscribe((doc) =>
                doc.download(this.createFilename(`Beneficial owner questionary N${idx}`))
            );
    }

    createFilename(name: string) {
        const { companyName, companyInn } = getCompanyInfo(this.questionary);
        return slugify([name, moment().utc().format(), companyInn, companyName].join('-'), {
            separator: '_',
        }).slice(0, FILENAME_LENGTH);
    }
}
