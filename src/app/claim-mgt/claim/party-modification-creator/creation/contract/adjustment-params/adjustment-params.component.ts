import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContractAdjustmentParams } from '../../../../../../thrift-services/damsel/gen-model/claim_management';

@Component({
    selector: 'cc-contract-adjustment-params',
    templateUrl: 'adjustment-params.component.html'
})
export class AdjustmentParamsComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    initialValue: ContractAdjustmentParams;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form.registerControl('template', this.fb.group({}));
        this.form.updateValueAndValidity();
    }
}
