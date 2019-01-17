import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'cc-payout-tool-params',
    templateUrl: 'payout-tool-params.component.html'
})
export class PayoutToolParamsComponent implements OnInit {
    @Input()
    form: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form.registerControl('currency', this.fb.group({}));
        this.form.registerControl('toolInfo', this.fb.group({}));
    }
}
