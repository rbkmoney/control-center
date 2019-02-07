import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { get } from 'lodash-es';

import { ContractParams } from '../../../gen-damsel/payment_processing';

@Component({
    selector: 'cc-contract-params',
    templateUrl: 'contract-params.component.html'
})
export class ContractParamsComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    initialValue: ContractParams;

    showTemplate = false;

    showPaymentInstitution = false;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        // this.form.registerControl('contractorId', this.fb.control('', Validators.required));
        this.form.registerControl('contractor', this.fb.group({}));
        this.toggleTemplate();
        this.togglePaymentInstitution();
    }

    toggleCheckbox(show: boolean, controlName: string, data: object = {}) {
        if (show) {
            this.form.registerControl(controlName, this.fb.group(data || {}));
        } else {
            this.form.removeControl(controlName);
        }
    }

    toggleTemplate() {
        const template = get(this, 'initialValue.template', null);
        this.showTemplate = template !== null;
        this.toggleCheckbox(this.showTemplate, 'template', template);
    }

    togglePaymentInstitution() {
        const paymentInstitution = get(this, 'initialValue.paymentInstitution', null);
        this.showPaymentInstitution = paymentInstitution !== null;
        this.toggleCheckbox(this.showPaymentInstitution, 'paymentInstitution', paymentInstitution);
    }
}
