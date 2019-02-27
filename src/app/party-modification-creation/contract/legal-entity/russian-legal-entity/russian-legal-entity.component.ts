import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import get from 'lodash-es/get';

import { RussianLegalEntity } from '../../../../gen-damsel/domain';

@Component({
    selector: 'cc-russian-legal-entity',
    templateUrl: 'russian-legal-entity.component.html'
})
export class RussianLegalEntityComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    initialValue: RussianLegalEntity;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        const control = value => this.fb.control(value, Validators.required);
        const registeredName = get(this, 'initialValue.registeredName', '');
        const registeredNumber = get(this, 'initialValue.registeredNumber', '');
        const inn = get(this, 'initialValue.inn', '');
        const actualAddress = get(this, 'initialValue.actualAddress', '');
        const postAddress = get(this, 'initialValue.postAddress', '');
        const representativePosition = get(this, 'initialValue.representativePosition', '');
        const representativeFullName = get(this, 'initialValue.representativeFullName', '');
        const representativeDocument = get(this, 'initialValue.representativeDocument', '');
        this.form.registerControl('registeredName', control(registeredName));
        this.form.registerControl('registeredNumber', control(registeredNumber));
        this.form.registerControl('inn', control(inn));
        this.form.registerControl('actualAddress', control(actualAddress));
        this.form.registerControl('postAddress', control(postAddress));
        this.form.registerControl('representativePosition', control(representativePosition));
        this.form.registerControl('representativeFullName', control(representativeFullName));
        this.form.registerControl('representativeDocument', control(representativeDocument));
        this.form.registerControl('russianBankAccount', this.fb.group({}));
        this.form.updateValueAndValidity();
    }
}
