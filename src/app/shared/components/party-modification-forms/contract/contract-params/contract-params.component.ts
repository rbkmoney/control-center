import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ContractParams } from '../../../../../thrift-services/damsel/gen-model/payment_processing';

@Component({
    selector: 'cc-contract-params',
    templateUrl: 'contract-params.component.html',
})
export class ContractParamsComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    initialValue: ContractParams;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.form.registerControl('payment_institution', this.fb.group({}));
        this.form.updateValueAndValidity();
    }
}
