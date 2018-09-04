import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CreateChangeItem } from '../create-change-item';
import { ContractModification } from '../../../damsel/payment-processing';
import { RussianLegalEntityFormService } from './legal-entity-form/russian-legal-entity-form/russian-legal-entity-form.service';

@Injectable()
export class CreateContractService implements CreateChangeItem {

    form: FormGroup;

    constructor(private fb: FormBuilder,
                private russianLegalEntityFormService: RussianLegalEntityFormService) {
        this.form = this.prepareForm();
    }

    getValue(): ContractModification {
        const {} = this.form.value;
        return {
            creation: {
                contractor: {}
            }
        };
    }

    isValid(): boolean {
        return this.form.valid;
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            legalEntityType: ['', Validators.required],
            russianLegalEntity: this.russianLegalEntityFormService.form
        });
    }
}
