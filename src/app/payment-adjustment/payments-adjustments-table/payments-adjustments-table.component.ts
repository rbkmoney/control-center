import { Component, OnInit } from '@angular/core';
import { Payment } from '../../papi/model';

@Component({
    selector: 'cc-payments-adjustments-table',
    templateUrl: './payments-adjustments-table.component.html',
    styleUrls: ['./payments-adjustments-table.component.css']
})
export class PaymentsAdjustmentsTableComponent implements OnInit {

    payments: Payment[] = [];

    cols = [
        'invoiceId',
        'id'
    ];

    constructor() {
    }

    ngOnInit() {
    }

}
