import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
}
