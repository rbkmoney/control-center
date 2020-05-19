import { Component, Input } from '@angular/core';

import { StatDeposit } from '../../thrift-services/fistful/gen-model/fistful_stat';

@Component({
    selector: 'cc-deposits-table',
    templateUrl: 'deposits-table.component.html',
    styleUrls: ['deposits-table.component.css'],
})
export class DepositsTableComponent {
    @Input()
    deposits: StatDeposit[];

    displayedColumns = ['id', 'status', 'createdAt', 'destinationID', 'amount'];
}
