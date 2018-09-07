import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

enum Type {
    russianBankAccount = 'russianBankAccount',
    internationalBankAccount = 'internationalBankAccount'
}

@Component({
    selector: 'cc-payout-tool-info',
    templateUrl: 'payout-tool-info.component.html'
})
export class PayoutToolInfoComponent {

    @Input()
    form: FormGroup;

    selected: Type;

    types = [Type.russianBankAccount, Type.internationalBankAccount];

    t = Type;

    constructor(private fb: FormBuilder) {
    }

    select() {
        switch (this.selected) {
            case Type.russianBankAccount:
                this.form.addControl(Type.russianBankAccount, this.fb.group({}));
                this.form.removeControl(Type.internationalBankAccount);
                break;
            case Type.internationalBankAccount:
                this.form.addControl(Type.internationalBankAccount, this.fb.group({}));
                this.form.removeControl(Type.russianBankAccount);
                break;
        }
        // this.selected = type;
    }
}
