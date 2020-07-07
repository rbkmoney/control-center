import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { RussianBankAccount } from '../../../../../thrift-services/ank/gen-model/questionary';

@Component({
    selector: 'cc-bank-account-info',
    templateUrl: 'bank-account-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BankAccountInfoComponent {
    @Input() bankAccount: RussianBankAccount;
}
