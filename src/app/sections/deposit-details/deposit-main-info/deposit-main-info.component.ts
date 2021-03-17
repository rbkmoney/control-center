import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { StatDeposit } from '../../../thrift-services/fistful/gen-model/fistful_stat';

@Component({
    selector: 'cc-deposit-main-info',
    templateUrl: 'deposit-main-info.component.html',
    styleUrls: ['deposit-main-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepositMainInfoComponent {
    @Input()
    deposit: StatDeposit;
}
