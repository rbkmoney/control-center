import { SelectionModel } from '@angular/cdk/collections';
import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { KeycloakService } from 'keycloak-angular';

import { Payout } from '../../papi/model';
import { CancelPayoutComponent } from '../cancel-payout/cancel-payout.component';

@Component({
    selector: 'cc-payouts-table',
    templateUrl: 'payouts-table.component.html',
    styleUrls: ['./payouts-table.component.scss'],
})
export class PayoutsTableComponent implements OnInit, OnChanges {
    @Output()
    valueChanges: EventEmitter<Payout[]> = new EventEmitter();

    @Input()
    payouts: Payout[];

    dataSource: MatTableDataSource<Payout> = new MatTableDataSource();
    roles: string[];
    selection = new SelectionModel<Payout>(true, []);

    @ViewChild(MatPaginator, { static: true })
    paginator: MatPaginator;

    displayedColumns = [
        'select',
        'id',
        'partyId',
        'shopId',
        'amount',
        'period',
        'status',
        'type',
        'payoutDetailButton',
    ];

    constructor(private matDialog: MatDialog, private keycloakService: KeycloakService) {}

    ngOnChanges(changes: SimpleChanges) {
        const { payouts } = changes;
        if (payouts && payouts.currentValue) {
            this.selection.clear();
            this.dataSource.data = payouts.currentValue;
        }
    }

    ngOnInit() {
        this.roles = this.keycloakService.getUserRoles();
        this.selection.changed.subscribe((e) => this.valueChanges.emit(e.source.selected));
        this.dataSource.paginator = this.paginator;
    }

    isAllSelected() {
        return this.selection.selected.length === this.payouts.length;
    }

    masterToggle() {
        this.isAllSelected() ? this.selection.clear() : this.selection.select(...this.payouts);
    }

    cancelPayout(id: string) {
        this.matDialog.open(CancelPayoutComponent, {
            data: id,
        });
    }

    hasRole(role: string): boolean {
        return this.roles.includes(role);
    }
}
