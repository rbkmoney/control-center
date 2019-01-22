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

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form.registerControl('number', this.fb.control(''));
        this.form.registerControl('iban', this.fb.control(''));
    }

    detailsChange(change: MatCheckboxChange) {
        this.isBankDetails = change.checked;
        change.checked
            ? this.form.registerControl('bank', this.fb.group({}))
            : this.form.removeControl('bank');
    }

    accountChange(change: MatCheckboxChange) {
        this.isCorrespondentAccount = change.checked;
        change.checked
            ? this.form.registerControl('correspondentAccount', this.fb.group({}))
            : this.form.removeControl('correspondentAccount');
    }
}
