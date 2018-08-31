import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as uuid from 'uuid/v4';

import { CreateChangeItem } from '../create-change-item';
import { ShopModification } from '../../../damsel/payment-processing';

@Injectable()
export class CreateLocationService implements CreateChangeItem {

    form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.prepareForm();
    }

    getValue(): ShopModification {
        const {url} = this.form.value;
        return {
            locationModification: {
                url
            }
        };
    }

    isValid(): boolean {
        return this.form.valid;
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            url: ['', Validators.required]
        });
    }
}
