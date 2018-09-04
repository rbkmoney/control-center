import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CreateChangeItem } from '../create-change-item';
import { ShopModification, ScheduleModification } from '../../../damsel/payment-processing';

@Injectable()
export class CreateBusinessScheduleRefService implements CreateChangeItem {

    static FORM_ID_NONE = 'none';
    form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.prepareForm();
    }

    getValue(): ShopModification {
        const {value} = this.form;
        const payoutScheduleModification: ScheduleModification = value.id === CreateBusinessScheduleRefService.FORM_ID_NONE
            ? {}
            : {schedule: value};
        return {payoutScheduleModification};
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
