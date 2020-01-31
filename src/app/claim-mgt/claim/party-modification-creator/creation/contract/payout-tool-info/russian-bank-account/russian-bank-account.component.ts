import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import get from 'lodash-es/get';
import { RussianBankAccount } from '../../../../../../../thrift-services/damsel/gen-model/domain';

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
        const bankName = get(this, 'initialValue.bank_name', '');
        const bankPostAccount = get(this, 'initialValue.bank_post_account', '');
        const bankBik = get(this, 'initialValue.bank_bik', '');
        this.form.registerControl('account', control(account));
        this.form.registerControl('bank_name', control(bankName));
        this.form.registerControl('bank_post_account', control(bankPostAccount));
        this.form.registerControl('bank_bik', control(bankBik));
        this.form.updateValueAndValidity();
    }
}
