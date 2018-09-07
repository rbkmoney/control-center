import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

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

    types = [Type.russianBankAccount, Type.internationalBankAccount];

    select(type: Type) {

    }
}
