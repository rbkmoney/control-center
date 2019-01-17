import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'cc-shop-contract-modification',
    templateUrl: 'contract-modification.component.html'
})
export class ContractModificationComponent implements OnInit {
    @Input()
    form: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form.registerControl('contractId', this.fb.control('', Validators.required));
        this.form.registerControl('payoutToolId', this.fb.control('', Validators.required));
    }
}
