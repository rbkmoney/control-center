import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material';

@Component({
    selector: 'cc-international-bank-account',
    templateUrl: 'international-bank-account.component.html'
})
export class InternationalBankAccountComponent implements OnInit {

    @Input()
    form: FormGroup;

    isBankDetails = false;

    isCorrespondentAccount = false;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form.addControl('number', this.fb.control(''));
        this.form.addControl('iban', this.fb.control(''));
    }

    detailsChange(change: MatCheckboxChange) {
        this.isBankDetails = change.checked;
        change.checked
            ? this.form.addControl('bank', this.fb.group({}))
            : this.form.removeControl('bank');
    }

    accountChange(change: MatCheckboxChange) {
        this.isCorrespondentAccount = change.checked;
        change.checked
            ? this.form.addControl('correspondentAccount', this.fb.group({}))
            : this.form.removeControl('correspondentAccount');
    }
}
