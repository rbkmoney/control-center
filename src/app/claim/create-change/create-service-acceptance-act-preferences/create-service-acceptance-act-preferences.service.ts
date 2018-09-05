import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import toNumber from 'lodash-es/toNumber';
import * as moment from 'moment';

import { CreateChangeItem } from '../create-change-item';
import { ContractModification } from '../../../damsel/payment-processing';
import { RepresentativeDocument, RepresentativeDocumentType } from '../../../damsel/domain';

@Injectable()
export class CreateServiceAcceptanceActPreferencesService implements CreateChangeItem {

    form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.prepareForm();
        this.form.controls.documentType.valueChanges.subscribe((documentType) => {
            switch (documentType) {
                case RepresentativeDocumentType.PowerOfAttorney:
                    this.form.setControl('signer', this.getPowerOfAttorneyGroup());
                    break;
                case RepresentativeDocumentType.ArticlesOfAssociation:
                    this.form.removeControl('signer');
                    break;
            }
        });
    }

    getValue(): ContractModification {
        const {scheduleID, fullName, position, documentType, signer} = this.form.value;
        return {
            reportPreferencesModification: {
                serviceAcceptanceActPreferences: {
                    schedule: {
                        id: toNumber(scheduleID)
                    },
                    signer: {
                        fullName,
                        position,
                        document: this.getDocument(documentType, signer)
                    }
                }
            }
        };
    }

    isValid(): boolean {
        return this.form.valid;
    }

    private getDocument(type: RepresentativeDocumentType, signerValue: any): RepresentativeDocument {
        switch (type) {
            case RepresentativeDocumentType.PowerOfAttorney:
                const {legalAgreementId, validUntil, signedAt} = signerValue;
                return {
                    powerOfAttorney: {
                        legalAgreementId,
                        validUntil: moment(validUntil).utc().format(),
                        signedAt: moment(signedAt).utc().format()
                    }
                };
            case RepresentativeDocumentType.ArticlesOfAssociation:
                return {
                    articlesOfAssociation: {}
                };
        }
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            scheduleID: ['', Validators.required],
            fullName: ['', Validators.required],
            position: ['', Validators.required],
            documentType: ['', Validators.required]
        });
    }

    private getPowerOfAttorneyGroup(): FormGroup {
        return this.fb.group({
            legalAgreementId: ['', Validators.required],
            signedAt: ['', Validators.required],
            validUntil: ['', Validators.required]
        });
    }
}
