import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import get from 'lodash-es/get';
import { PayoutToolInfo } from '../../../../../../thrift-services/damsel/gen-model/domain';

enum Type {
    russianBankAccount = 'russian_bank_account',
    internationalBankAccount = 'international_bank_account',
    walletInfo = 'wallet_info'
}

@Component({
    selector: 'cc-payout-tool-info',
    templateUrl: 'payout-tool-info.component.html'
})
export class PayoutToolInfoComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    initialValue: PayoutToolInfo;

    selected: Type;

    types = [Type.russianBankAccount, Type.internationalBankAccount, Type.walletInfo];

    t = Type;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        const russianBankAccount = get(this, 'initialValue.russian_bank_account', null);
        const internationalBankAccount = get(this, 'initialValue.international_bank_account', null);
        const walletInfo = get(this, 'initialValue.wallet_info', null);
        if (russianBankAccount) {
            this.selected = Type.russianBankAccount;
        }
        if (internationalBankAccount) {
            this.selected = Type.internationalBankAccount;
        }
        if (walletInfo) {
            this.selected = Type.walletInfo;
        }
        this.select();
        this.form.updateValueAndValidity();
    }

    select() {
        switch (this.selected) {
            case Type.russianBankAccount:
                this.clearControl();
                this.form.registerControl(Type.russianBankAccount, this.fb.group({}));
                break;
            case Type.internationalBankAccount:
                this.clearControl();
                this.form.registerControl(Type.internationalBankAccount, this.fb.group({}));
                break;
            case Type.walletInfo:
                this.clearControl();
                const walletInfo = get(this, 'initialValue.wallet_info', {});
                this.form.registerControl(Type.walletInfo, this.fb.group(walletInfo));
                break;
        }
    }

    private clearControl() {
        this.types.forEach(type => {
            this.form.removeControl(type);
        });
    }
}
