import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatSnackBar } from '@angular/material';
import { filter } from 'rxjs/operators';

import { Payout, PayoutStatus } from '../../papi/model';
import { PayoutDialogComponent } from './payout-dialog.component';

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
        'amount',
        'period',
        'status',
        'createdAt',
        'payoutDetailButton'
    ];

    constructor(private matDialog: MatDialog,
                private snackBar: MatSnackBar) {
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.payouts.length;
        return numSelected === numRows;
    }

    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.payouts.forEach(row => this.selection.select(row));
    }

    ngOnInit() {
        this.selection.onChange.asObservable().subscribe((e) => {
            this.valueChanges.emit(e.source.selected);
        });
    }

    ngOnChanges() {
        this.selection.clear();
    }

    openPayoutDetails(payouts: Payout) {
        this.matDialog.open(PayoutDialogComponent, {
            data: this.payouts.find((payout) => payout.id === payouts.id),
            width: '720px'
        }).afterClosed()
            .pipe(filter((result) => result === PayoutStatus.confirmed || result === PayoutStatus.cancelled))
            .subscribe((result) => {
                const message = result === PayoutStatus.confirmed ? 'Payout accepted' : 'Payout revoked';
                this.snackBar.open(message, 'OK', {
                    duration: 1500
                });
                this.valueChanges.emit();
            });
    }
}
