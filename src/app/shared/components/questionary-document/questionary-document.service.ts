import { Injectable } from '@angular/core';
import isEmpty from 'lodash-es/isEmpty';
import { TCreatedPdf } from 'pdfmake/build/pdfmake';
import { combineLatest, Observable, of } from 'rxjs';

import { DocumentService } from '../../../document';
import { BeneficialOwner } from '../../../thrift-services/ank/gen-model/questionary';
import { Questionary } from '../../../thrift-services/ank/gen-model/questionary_manager';
import { createQuestionary } from './create-questionary';
import { getBeneficialOwnerDocDef } from './get-beneficial-owner-doc-def';
import { getBeneficialOwners } from './get-beneficial-owners';
import { getEntityQuestionaryDocDef } from './get-entity-questionary-doc-def';
import { getCompanyInfo } from './select-data';

@Injectable()
export class QuestionaryDocumentService {
    constructor(private documentService: DocumentService) {}

    createDoc(questionary: Questionary): Observable<TCreatedPdf> {
        return this.documentService.createPdf(
            ...createQuestionary(getEntityQuestionaryDocDef(questionary))
        );
    }

    createBeneficialOwnerDoc(
        beneficialOwner: BeneficialOwner,
        companyName: string,
        companyInn: string
    ): Observable<TCreatedPdf> {
        const docDef = getBeneficialOwnerDocDef(beneficialOwner, companyName, companyInn);
        return this.documentService.createPdf(...createQuestionary(docDef));
    }

    createBeneficialOwnerDocs(questionary: Questionary): Observable<TCreatedPdf[]> {
        if (questionary) {
            const beneficialOwners = getBeneficialOwners(questionary);
            if (!isEmpty(beneficialOwners)) {
                const { companyName, companyInn } = getCompanyInfo(questionary);
                const beneficialOwnersDocs = beneficialOwners.map((beneficialOwner) =>
                    this.createBeneficialOwnerDoc(beneficialOwner, companyName, companyInn)
                );
                return combineLatest(beneficialOwnersDocs);
            }
        }
        return of([]);
    }
}
