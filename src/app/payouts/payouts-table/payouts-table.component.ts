import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material';

import { Payout } from '../../papi/model';
import { CancelPayoutComponent } from '../cancel-payout/cancel-payout.component';

@Component({
    selector: 'cc-payouts-table',
    templateUrl: 'payouts-table.component.html',
    styleUrls: ['./payouts-table.component.css']
})
export class PayoutsTableComponent implements OnInit, OnChanges {

    @Output()
    valueChanges: EventEmitter<Payout[]> = new EventEmitter();

    @Input()
    payouts: Payout[];

    initialSelection = [];
    allowMultiSelect = true;
    selection = new SelectionModel<Payout>(this.allowMultiSelect, this.initialSelection);

    displayedColumns = [
        'select',
        'id',
        'partyId',
        'shopId',
        'amount',
        'period',
        'status',
        'createdAt',
        'payoutDetailButton'
    ];

    constructor(private matDialog: MatDialog) {
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.payouts.length;
        return numSelected === numRows;
    }

    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.payouts.forEach((row) => this.selection.select(row));
    }

    ngOnInit() {
        this.selection.onChange.asObservable().subscribe((e) => {
            this.valueChanges.emit(e.source.selected);
        });
    }

    ngOnChanges() {
        this.selection.clear();
    }

    cancelPayout(id: string) {
        this.matDialog.open(CancelPayoutComponent, {
            data: id
        });
    }
}
