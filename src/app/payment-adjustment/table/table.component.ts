import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

import { Payment } from '../../papi/model';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'cc-payment-adjustment-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {

    @Input()
    payments: Payment[];

    dataSource: MatTableDataSource<Payment>;

    @Output()
    changeSelected: EventEmitter<Payment[]> = new EventEmitter();

    selection = new SelectionModel<Payment>(true, []);

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

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
            this.dataSource = new MatTableDataSource(this.payments);
            this.dataSource.paginator = this.paginator;
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
