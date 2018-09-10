import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

import { Payment } from '../../papi/model';

@Component({
    selector: 'cc-payments-adjustments-table',
    templateUrl: './payments-adjustments-table.component.html',
    styleUrls: ['./payments-adjustments-table.component.css']
})
export class PaymentsAdjustmentsTableComponent implements OnInit, OnChanges {

    @Input()
    payments: Payment[];

    @Output()
    changeSelected: EventEmitter<Payment[]> = new EventEmitter();

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
        this.selection.onChange.subscribe((e) => this.changeSelected.emit(e.source.selected));
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.payments) {
            this.selection.clear();
            this.changeSelected.emit([]);
        }
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
