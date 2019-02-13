import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as uuid from 'uuid/v4';
import get from 'lodash-es/get';

import { PayoutToolModificationUnit } from '../../../gen-damsel/payment_processing';

@Component({
    selector: 'cc-contract-payout-tool-modification-unit',
    templateUrl: 'payout-tool-modification-unit.component.html'
})
export class PayoutToolModificationUnitComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    initialValue: PayoutToolModificationUnit;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        const payoutToolId = get(this, 'initialValue.payoutToolId', '');
        this.form.registerControl('payoutToolId', this.fb.control(payoutToolId, Validators.required));
        this.form.registerControl('modification', this.fb.group({}));
    }

    generate() {
        this.form.patchValue({ payoutToolId: uuid() });
    }
}
