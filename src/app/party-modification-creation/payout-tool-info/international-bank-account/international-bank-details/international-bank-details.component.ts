import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'cc-international-bank-details',
    templateUrl: 'international-bank-details.component.html'
})
export class InternationalBankDetailsComponent implements OnInit {

    @Input()
    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form.addControl('bic', this.fb.control(''));
        this.form.addControl('country', this.fb.control(''));
        this.form.addControl('name', this.fb.control(''));
        this.form.addControl('address', this.fb.control(''));
        this.form.addControl('abaRtn', this.fb.control(''));
    }
}
