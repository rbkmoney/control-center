import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import get from 'lodash-es/get';
import * as uuid from 'uuid/v4';

import { PayoutToolModificationUnit } from '../../../thrift-services/damsel/gen-model/payment_processing';

@Component({
    selector: 'cc-contract-payout-tool-modification-unit',
    templateUrl: 'payout-tool-modification-unit.component.html',
})
export class PayoutToolModificationUnitComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    initialValue: PayoutToolModificationUnit;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        const payoutToolId = get(this, 'initialValue.payout_tool_id', '');
        this.form.registerControl(
            'payout_tool_id',
            this.fb.control(payoutToolId, Validators.required)
        );
        this.form.registerControl('modification', this.fb.group({}));
        this.form.updateValueAndValidity();
    }

    generate() {
        this.form.patchValue({ payout_tool_id: uuid() });
    }
}
