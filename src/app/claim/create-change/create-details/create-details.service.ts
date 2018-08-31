import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CreateChangeItem } from '../create-change-item';
import { ShopModification } from '../../../damsel/payment-processing';

@Injectable()
export class CreateDetailsService implements CreateChangeItem {

    form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.prepareForm();
    }

    getValue(): ShopModification {
        const {name, description} = this.form.value;
        return {
            detailsModification: {
                name,
                description
            }
        };
    }

    isValid(): boolean {
        return this.form.valid;
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            name: ['', Validators.required],
            description: ''
        });
    }
}
