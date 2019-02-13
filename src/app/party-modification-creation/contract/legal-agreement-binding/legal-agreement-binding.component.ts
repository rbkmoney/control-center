import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import get from 'lodash-es/get';

import { LegalAgreement } from '../../../gen-damsel/domain';

@Component({
    selector: 'cc-legal-agreement-binding',
    templateUrl: 'legal-agreement-binding.component.html'
})
export class LegalAgreementBindingComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    initialValue: LegalAgreement;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        const legalAgreementId = get(this, 'initialValue.legalAgreementId', '');
        const signedAt = get(this, 'initialValue.signedAt', '');
        const validUntil = get(this, 'initialValue.validUntil', '');
        this.form.registerControl('legalAgreementId', this.fb.control(legalAgreementId, Validators.required));
        this.form.registerControl('signedAt', this.fb.control(signedAt, Validators.required));
        this.form.registerControl('validUntil', this.fb.control(validUntil));
    }
}
