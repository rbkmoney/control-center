import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

import { MatPaginator, MatTableDataSource } from '@angular/material';
import { StatPayment } from '../../gen-damsel/merch_stat';

@Component({
    selector: 'cc-payment-adjustment-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {

    @Input()
    payments: StatPayment[];

    dataSource: MatTableDataSource<StatPayment>;

    @Output()
    changeSelected: EventEmitter<StatPayment[]> = new EventEmitter();

    selection = new SelectionModel<StatPayment>(true, []);

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    cols = [
        'select',
        'revision',
        'invoiceId',
        'id',
        'createdAt',
        'shopId',
        'ownerId'
    ];

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
