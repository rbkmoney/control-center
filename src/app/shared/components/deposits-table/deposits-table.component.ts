import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { DepositID } from '../../../thrift-services/fistful/gen-model/deposit';
import { StatDeposit } from '../../../thrift-services/fistful/gen-model/fistful_stat';
import { DepositActions } from './deposit-actions';
import { DepositMenuItemEvent } from './deposit-menu-item-event';

@Component({
    selector: 'cc-deposits-table',
    templateUrl: 'deposits-table.component.html',
    styleUrls: ['deposits-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepositsTableComponent {
    @Input()
    deposits: StatDeposit[];

    @Output()
    menuItemSelected$: EventEmitter<DepositMenuItemEvent> = new EventEmitter();

    depositActions = Object.keys(DepositActions);

    displayedColumns = ['id', 'status', 'createdAt', 'destinationID', 'amount', 'actions'];

    menuItemSelected(action: string, depositID: DepositID) {
        switch (action) {
            case DepositActions.navigateToDeposit:
                this.menuItemSelected$.emit({ action, depositID });
                break;
            default:
                console.error('Wrong payment action type.');
        }
    }
}
