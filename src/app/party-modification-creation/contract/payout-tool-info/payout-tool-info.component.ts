import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

enum Type {
    russianBankAccount = 'russianBankAccount',
    internationalBankAccount = 'internationalBankAccount',
    walletInfo = 'walletInfo'
}

@Component({
    selector: 'cc-payout-tool-info',
    templateUrl: 'payout-tool-info.component.html'
})
export class PayoutToolInfoComponent {

    @Input()
    form: FormGroup;

    selected: Type;

    types = [Type.russianBankAccount, Type.internationalBankAccount, Type.walletInfo];

    t = Type;

    constructor(private fb: FormBuilder) {
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
                this.form.registerControl(Type.walletInfo, this.fb.group({}));
                break;
        }
    }

    private clearControl() {
        this.types.forEach((type) => {
            this.form.removeControl(type);
        });
    }
}
