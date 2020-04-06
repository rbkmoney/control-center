import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { KeycloakService } from 'keycloak-angular';
import { filter } from 'rxjs/internal/operators';

import { Payout, PayoutStatus } from '../../papi/model';
import { ConfirmPayoutsComponent } from '../confirm-payouts/confirm-payouts.component';
import { CreatePayoutComponent } from '../create-payout/create-payout.component';
import { PayPayoutsComponent } from '../pay-payouts/pay-payouts.component';

@Component({
    selector: 'cc-payouts-actions',
    templateUrl: 'payouts-actions.component.html'
})
export class PayoutsActionsComponent implements OnInit {
    @Input()
    selectedPayouts: Payout[];

    @Output()
    doAction: EventEmitter<void> = new EventEmitter();

    roles: string[];

    constructor(private keycloakService: KeycloakService, private dialogRef: MatDialog) {}

    ngOnInit() {
        this.roles = this.keycloakService.getUserRoles();
    }

    pay() {
        this.dialogRef
            .open(PayPayoutsComponent, {
                data: this.getIds(this.selectedPayouts)
            })
            .afterClosed()
            .pipe(filter(result => result === 'success'))
            .subscribe(() => this.doAction.emit());
    }

    confirmPayouts() {
        this.dialogRef
            .open(ConfirmPayoutsComponent, {
                data: this.getIds(this.selectedPayouts)
            })
            .afterClosed()
            .pipe(filter(result => result === 'success'))
            .subscribe(() => this.doAction.emit());
    }

    createPayout() {
        this.dialogRef
            .open(CreatePayoutComponent, {
                width: '720px',
                disableClose: true
            })
            .afterClosed()
            .pipe(filter(result => result === 'success'))
            .subscribe(() => this.doAction.emit());
    }

    hasRole(role: string): boolean {
        return this.roles.includes(role);
    }

    isCanPay(): boolean {
        const unpaid = this.selectedPayouts.filter(p => p.status === PayoutStatus.unpaid);
        return this.selectedPayouts.length === unpaid.length && unpaid.length > 0;
    }

    isCanConfirm(): boolean {
        const paid = this.selectedPayouts.filter(p => p.status === PayoutStatus.paid);
        return this.selectedPayouts.length === paid.length && paid.length > 0;
    }

    private getIds(payouts: Payout[]): string[] {
        return payouts.map(p => p.id);
    }
}
