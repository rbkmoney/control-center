import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import get from 'lodash-es/get';

import { PayoutToolInfo } from '../../../../../thrift-services/damsel/gen-model/domain';

enum Type {
    RussianBankAccount = 'russian_bank_account',
    InternationalBankAccount = 'international_bank_account',
    WalletInfo = 'wallet_info',
}

@Component({
    selector: 'cc-payout-tool-info',
    templateUrl: 'payout-tool-info.component.html',
})
export class PayoutToolInfoComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    initialValue: PayoutToolInfo;

    selected: Type;

    types = [Type.RussianBankAccount, Type.InternationalBankAccount, Type.WalletInfo];

    t = Type;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        const russianBankAccount = get(this, 'initialValue.russian_bank_account', null);
        const internationalBankAccount = get(this, 'initialValue.international_bank_account', null);
        const walletInfo = get(this, 'initialValue.wallet_info', null);
        if (russianBankAccount) {
            this.selected = Type.RussianBankAccount;
        }
        if (internationalBankAccount) {
            this.selected = Type.InternationalBankAccount;
        }
        if (walletInfo) {
            this.selected = Type.WalletInfo;
        }
        this.select();
        this.form.updateValueAndValidity();
    }

    select() {
        switch (this.selected) {
            case Type.RussianBankAccount:
                this.clearControl();
                this.form.registerControl(Type.RussianBankAccount, this.fb.group({}));
                break;
            case Type.InternationalBankAccount:
                this.clearControl();
                this.form.registerControl(Type.InternationalBankAccount, this.fb.group({}));
                break;
            case Type.WalletInfo: {
                this.clearControl();
                const walletInfo = get(this, 'initialValue.wallet_info', {});
                this.form.registerControl(Type.WalletInfo, this.fb.group(walletInfo));
                break;
            }
        }
    }

    private clearControl() {
        this.types.forEach((type) => {
            this.form.removeControl(type);
        });
    }
}
