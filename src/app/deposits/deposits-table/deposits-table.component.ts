import { Component, Input } from '@angular/core';

import { StatDeposit } from '../../fistful/gen-model/fistful_stat';

@Component({
    selector: 'cc-deposits-table',
    templateUrl: 'deposits-table.component.html',
    styleUrls: ['deposits-table.component.css']
})
export class DepositsTableComponent {
    @Input()
    deposits: StatDeposit[];

    displayedColumns = ['id', 'createdAt', 'destinationID', 'amount', 'currency', 'status'];
}
