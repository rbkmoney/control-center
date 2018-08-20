import { Component, Input } from '@angular/core';

import { Payout } from '../../papi/model';

@Component({
    selector: 'cc-payouts-table',
    templateUrl: 'payouts-table.component.html',
    styleUrls: ['./payouts-table.component.css']
})
export class PayoutsTableComponent {

    @Input()
    payouts: Payout[];

    displayedColumns = [
        'id',
        'amount',
        'period',
        'status',
        'createdAt'
    ];
}
