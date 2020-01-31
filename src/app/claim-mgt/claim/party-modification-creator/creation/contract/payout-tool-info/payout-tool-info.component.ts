import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import get from 'lodash-es/get';
import { PayoutToolInfo } from '../../../../../../thrift-services/damsel/gen-model/domain';

enum Type {
    russian_bank_account = 'russian_bank_account',
    international_bank_account = 'international_bank_account',
    wallet_info = 'wallet_info'
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

    types = [Type.russian_bank_account, Type.international_bank_account, Type.wallet_info];

    t = Type;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        const russianBankAccount = get(this, 'initialValue.russian_bank_account', null);
        const internationalBankAccount = get(this, 'initialValue.international_bank_account', null);
        const walletInfo = get(this, 'initialValue.wallet_info', null);
        if (russianBankAccount) {
            this.selected = Type.russian_bank_account;
        }
        if (internationalBankAccount) {
            this.selected = Type.international_bank_account;
        }
        if (walletInfo) {
            this.selected = Type.wallet_info;
        }
        this.select();
        this.form.updateValueAndValidity();
    }

    select() {
        switch (this.selected) {
            case Type.russian_bank_account:
                this.clearControl();
                this.form.registerControl(Type.russian_bank_account, this.fb.group({}));
                break;
            case Type.international_bank_account:
                this.clearControl();
                this.form.registerControl(Type.international_bank_account, this.fb.group({}));
                break;
            case Type.wallet_info:
                this.clearControl();
                const walletInfo = get(this, 'initialValue.wallet_info', {});
                this.form.registerControl(Type.wallet_info, this.fb.group(walletInfo));
                break;
        }
    }

    private clearControl() {
        this.types.forEach(type => {
            this.form.removeControl(type);
        });
    }
}
