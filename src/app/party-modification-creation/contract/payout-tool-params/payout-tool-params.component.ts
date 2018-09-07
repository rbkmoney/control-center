import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'cc-payout-tool-params',
    templateUrl: 'payout-tool-params.component.html'
})
export class PayoutToolParamsComponent implements OnInit {

    @Input()
    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form.addControl('currency', this.fb.group({}));
        this.form.addControl('toolInfo', this.fb.group({}));
    }
}
