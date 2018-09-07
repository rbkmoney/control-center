import { Component, OnInit } from '@angular/core';
import { Payment } from '../../papi/model';

@Component({
    selector: 'cc-payment-adjustment-table',
    templateUrl: './payment-adjustment-table.component.html',
    styleUrls: ['./payment-adjustment-table.component.css']
})
export class PaymentAdjustmentTableComponent implements OnInit {

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
