import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as uuid from 'uuid/v4';

import { CreateChangeItem } from '../create-change-item';
import { ShopModification } from '../../../damsel/payment-processing';

@Injectable()
export class CreateShopService implements CreateChangeItem {

    form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.prepareForm();
    }

    getValue(): ShopModification {
        const {url, name, description} = this.form.value;
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
            url: ['', Validators.required],
            name: ['', Validators.required],
            description: ''
        });
    }
}
