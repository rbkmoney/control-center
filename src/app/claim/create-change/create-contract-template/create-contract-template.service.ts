import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as uuid from 'uuid/v4';

import { CreateChangeItem } from '../create-change-item';
import { ContractModification } from '../../../damsel/payment-processing';

@Injectable()
export class CreateContractTemplateService implements CreateChangeItem {

    form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.prepareForm();
    }

    getValue(): ContractModification {
        return {
            adjustmentModification: {
                adjustmentId: uuid(),
                modification: {
                    creation: {
                        template: this.form.value
                    }
                }
            }
        };
    }

    isValid(): boolean {
        return this.form.valid;
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            id: ['', Validators.required]
        });
    }
}
