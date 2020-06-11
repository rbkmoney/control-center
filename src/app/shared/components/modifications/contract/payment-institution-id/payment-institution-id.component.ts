import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ContractorID } from '../../../../../thrift-services/damsel/gen-model/domain';

@Component({
    selector: 'cc-payment-institution-id',
    templateUrl: 'payment-institution-id.component.html',
})
export class PaymentInstitutionIdComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    initialValue: ContractorID;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form.registerControl('payment_institution', this.fb.group({}));
        this.form.updateValueAndValidity();
    }
}
