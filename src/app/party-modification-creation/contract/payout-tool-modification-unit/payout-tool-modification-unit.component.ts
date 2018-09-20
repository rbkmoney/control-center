import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as uuid from 'uuid/v4';

@Component({
    selector: 'cc-contract-payout-tool-modification-unit',
    templateUrl: 'payout-tool-modification-unit.component.html'
})
export class PayoutToolModificationUnitComponent implements OnInit {

    @Input()
    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form.registerControl('payoutToolId', this.fb.control('', Validators.required));
        this.form.registerControl('modification', this.fb.group({}));
    }

    generate() {
        this.form.setValue({...this.form.value, payoutToolId: uuid()});
    }
}
