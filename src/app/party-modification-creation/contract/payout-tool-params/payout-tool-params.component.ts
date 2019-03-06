import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { PayoutToolInfo } from '../../../gen-damsel/domain';

@Component({
    selector: 'cc-payout-tool-params',
    templateUrl: 'payout-tool-params.component.html'
})
export class PayoutToolParamsComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    initialValue: PayoutToolInfo;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form.registerControl('currency', this.fb.group({}));
        this.form.registerControl('tool_info', this.fb.group({}));
        this.form.updateValueAndValidity();
    }
}
