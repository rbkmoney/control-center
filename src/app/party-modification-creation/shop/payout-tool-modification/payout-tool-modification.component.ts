import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'cc-shop-payout-tool-modification',
    templateUrl: 'payout-tool-modification.component.html'
})
export class PayoutToolModificationComponent implements OnInit {

    @Input()
    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form.setControl('modification', this.fb.control('', Validators.required));
    }
}
