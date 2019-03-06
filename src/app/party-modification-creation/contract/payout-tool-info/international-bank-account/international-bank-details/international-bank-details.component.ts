import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import get from 'lodash-es/get';

import { InternationalBankDetails } from '../../../../../gen-damsel/domain';

@Component({
    selector: 'cc-international-bank-details',
    templateUrl: 'international-bank-details.component.html'
})
export class InternationalBankDetailsComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    initialValue: InternationalBankDetails;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        const control = (data = '') => this.fb.control(data);
        const bic = get(this, 'initialValue.bic', '');
        const country = get(this, 'initialValue.country', '');
        const name = get(this, 'initialValue.name', '');
        const address = get(this, 'initialValue.address', '');
        const abaRtn = get(this, 'initialValue.aba_rtn', '');
        this.form.registerControl('bic', control(bic));
        this.form.registerControl('country', control(country)); // Residence enum
        this.form.registerControl('name', control(name));
        this.form.registerControl('address', control(address));
        this.form.registerControl('aba_rtn', control(abaRtn));
        this.form.updateValueAndValidity();
    }
}
