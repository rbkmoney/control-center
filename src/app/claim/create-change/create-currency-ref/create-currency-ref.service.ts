import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CreateChangeItem } from '../create-change-item';
import { ShopModification } from '../../../backend/model/damsel/payment-processing';

@Injectable()
export class CreateCurrencyRefService implements CreateChangeItem {

    form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.prepareForm();
    }

    getValue(): ShopModification {
        return {
            shopAccountCreation: {
                currency: this.form.value
            }
        };
    }

    isValid(): boolean {
        return this.form.valid;
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            symbolicCode: ['RUB', Validators.required]
        });
    }
}
