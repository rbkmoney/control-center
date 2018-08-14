import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

import { CreateChangeItem } from '../create-change-item';
import { ContractModification } from '../../../damsel';

@Injectable()
export class CreateLegalAgreementService implements CreateChangeItem {

    form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.prepareForm();
    }

    getValue(): ContractModification {
        const {legalAgreementId, signedAt} = this.form.value;
        return {
            legalAgreementBinding: {
                legalAgreementId,
                signedAt: moment(signedAt).utc().format()
            }
        };
    }

    isValid(): boolean {
        return this.form.valid;
    }

    private prepareForm() {
        return this.fb.group({
            legalAgreementId: ['', Validators.required],
            signedAt: ['', Validators.required]
        });
    }
}
