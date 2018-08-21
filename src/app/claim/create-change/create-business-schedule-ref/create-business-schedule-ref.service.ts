import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CreateChangeItem } from '../create-change-item';
import { ShopModification } from '../../../damsel/payment-processing';

@Injectable()
export class CreateBusinessScheduleRefService implements CreateChangeItem {

    form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.prepareForm();
    }

    getValue(): ShopModification {
        return {
            payoutScheduleModification: {
                schedule: this.form.value
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
