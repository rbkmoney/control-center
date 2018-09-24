import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import values from 'lodash-es/values';

import { Residence } from '../../../../../damsel/domain';

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
        this.form.registerControl('bic', this.fb.control(''));
        this.form.registerControl('country', this.fb.control('')); // Residence enum
        this.form.registerControl('name', this.fb.control(''));
        this.form.registerControl('address', this.fb.control(''));
        this.form.registerControl('abaRtn', this.fb.control(''));
    }

    private toResidences(): string[] {
        return values(Residence);
    }
}
