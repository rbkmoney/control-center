import { Component, Input, OnInit, Output } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

import { Payment } from '../../papi/model';

@Component({
    selector: 'cc-payments-adjustments-table',
    templateUrl: './payments-adjustments-table.component.html',
    styleUrls: ['./payments-adjustments-table.component.css']
})
export class PaymentsAdjustmentsTableComponent implements OnInit {

    @Input()
    payments: Payment[];

    @Output()
    selection = new SelectionModel<Payment>(true, []);

    cols = [
        'select',
        'invoiceId',
        'id',
        'createdAt',
        'shopId',
        'ownerId'
    ];

    constructor() {
    }

    ngOnInit() {
    }

    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.payments.forEach((row) => this.selection.select(row));
    }

    isAllSelected() {
        return this.selection.selected.length === this.payments.length;
    }

}
