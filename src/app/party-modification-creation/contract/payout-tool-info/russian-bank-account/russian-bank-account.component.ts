import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import get from 'lodash-es/get';

import { RussianBankAccount } from '../../../../gen-damsel/domain';

@Component({
    selector: 'cc-russian-bank-account',
    templateUrl: 'russian-bank-account.component.html'
})
export class RussianBankAccountComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    initialValue: RussianBankAccount;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        const control = value => this.fb.control(value, Validators.required);
        const account = get(this, 'initialValue.account', '');
        const bankName = get(this, 'initialValue.bankName', '');
        const bankPostAccount = get(this, 'initialValue.bankPostAccount', '');
        const bankBik = get(this, 'initialValue.bankBik', '');
        this.form.registerControl('account', control(account));
        this.form.registerControl('bankName', control(bankName));
        this.form.registerControl('bankPostAccount', control(bankPostAccount));
        this.form.registerControl('bankBik', control(bankBik));
    }
}
