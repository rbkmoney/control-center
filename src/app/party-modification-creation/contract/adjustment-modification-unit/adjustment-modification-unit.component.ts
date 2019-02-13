import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as uuid from 'uuid/v4';
import get from 'lodash-es/get';

import { ContractAdjustmentModificationUnit } from '../../../gen-damsel/payment_processing';

@Component({
    selector: 'cc-adjustment-modification-unit',
    templateUrl: 'adjustment-modification-unit.component.html'
})
export class AdjustmentModificationUnitComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    initialValue: ContractAdjustmentModificationUnit;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        const adjustmentId = get (this, 'initialValue.adjustmentId', '');
        this.form.registerControl('adjustmentId', this.fb.control(adjustmentId, Validators.required));
        this.form.registerControl('modification', this.fb.group({}));
    }

    generate() {
        this.form.patchValue({ adjustmentId: uuid() });
    }
}
