import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

import { Payout } from '../../papi/model';

@Component({
    selector: 'cc-payouts-table',
    templateUrl: 'payouts-table.component.html',
    styleUrls: ['./payouts-table.component.css']
})
export class PayoutsTableComponent implements OnInit {

    @Output()
    valueChanges: EventEmitter<Payout[]> = new EventEmitter();

    @Input()
    payouts: Payout[];

    public initialSelection = [];
    public allowMultiSelect = true;
    public selection = new SelectionModel<Payout>(this.allowMultiSelect, this.initialSelection);

    public displayedColumns = [
        'select',
        'id',
        'amount',
        'period',
        'status',
        'createdAt'
    ];

    public isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.payouts.length;
        return numSelected === numRows;
    }

    public masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.payouts.forEach(row => this.selection.select(row));
    }

    public ngOnInit() {
        this.selection.onChange.asObservable().subscribe((e) => {
            this.valueChanges.emit(e.source.selected);
        });
    }
}
