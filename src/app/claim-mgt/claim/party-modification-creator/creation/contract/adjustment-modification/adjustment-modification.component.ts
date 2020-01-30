import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContractAdjustmentModification } from '../../../../../../thrift-services/damsel/gen-model/claim_management';

@Component({
    selector: 'cc-adjustment-modification',
    templateUrl: 'adjustment-modification.component.html'
})
export class AdjustmentModificationComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    initialValue: ContractAdjustmentModification;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form.registerControl('creation', this.fb.group({}));
        this.form.updateValueAndValidity();
    }
}
