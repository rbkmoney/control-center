import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import isString from 'lodash-es/isString';

import { Residence } from '../../../../damsel/domain';

@Component({
    selector: 'cc-international-bank-details',
    templateUrl: 'international-bank-details.component.html'
})
export class InternationalBankDetailsComponent implements OnInit {

    @Input()
    form: FormGroup;

    residences: string[] = [];

    Residence = Residence;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.residences = this.toResidences();
        this.form.addControl('bic', this.fb.control(''));
        this.form.addControl('country', this.fb.control('')); // Residence enum
        this.form.addControl('name', this.fb.control(''));
        this.form.addControl('address', this.fb.control(''));
        this.form.addControl('abaRtn', this.fb.control(''));
    }

    private toResidences(): string[] {
        const result = [];
        for (const residenceKey in Residence) {
            if (Residence[residenceKey]) {
                const key = Residence[residenceKey];
                if (isString(key)) {
                    result.push(key);
                }
            }
        }
        return result;
    }
}
