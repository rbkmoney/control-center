import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import get from 'lodash-es/get';

import { InternationalBankAccount } from '../../../../../../thrift-services/damsel/gen-model/domain';

@Component({
    selector: 'cc-international-bank-account',
    templateUrl: 'international-bank-account.component.html',
})
export class InternationalBankAccountComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    initialValue: InternationalBankAccount;

    isBankDetails = false;

    isCorrespondentAccount = false;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        const num = get(this, 'initialValue.number', '');
        const iban = get(this, 'initialValue.iban', '');
        this.form.registerControl('number', this.fb.control(num));
        this.form.registerControl('iban', this.fb.control(iban));
        const bank = get(this, 'initialValue.bank', null);
        if (bank) {
            this.detailsChange(true);
        }
        const account = get(this, 'initialValue.correspondent_account', null);
        if (account) {
            this.accountChange(true);
        }
        this.form.updateValueAndValidity();
    }

    detailsChange(showDetails: boolean) {
        this.isBankDetails = showDetails;
        if (this.isBankDetails) this.form.registerControl('bank', this.fb.group({}));
        else this.form.removeControl('bank');
    }

    accountChange(showCorrespondentAccount: boolean) {
        this.isCorrespondentAccount = showCorrespondentAccount;
        if (this.isCorrespondentAccount)
            this.form.registerControl('correspondent_account', this.fb.group({}));
        else this.form.removeControl('correspondent_account');
    }
}
