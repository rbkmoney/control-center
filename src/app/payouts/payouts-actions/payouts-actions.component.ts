import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';

import { AppAuthGuardService, PayoutRole } from '@cc/app/shared/services';

import { Payout, PayoutStatus } from '../../papi/model';
import { ConfirmPayoutsComponent } from '../confirm-payouts/confirm-payouts.component';
import { CreatePayoutComponent } from '../create-payout/create-payout.component';
import { PayPayoutsComponent } from '../pay-payouts/pay-payouts.component';

@Component({
    selector: 'cc-payouts-actions',
    templateUrl: 'payouts-actions.component.html',
})
export class PayoutsActionsComponent {
    @Input()
    selectedPayouts: Payout[];

    @Output()
    doAction: EventEmitter<void> = new EventEmitter();

    PayoutRole = PayoutRole;

    constructor(private dialogRef: MatDialog, private appAuthGuardService: AppAuthGuardService) {}

    pay() {
        this.dialogRef
            .open(PayPayoutsComponent, {
                data: this.getIds(this.selectedPayouts),
            })
            .afterClosed()
            .pipe(filter((result) => result === 'success'))
            .subscribe(() => this.doAction.emit());
    }

    confirmPayouts() {
        this.dialogRef
            .open(ConfirmPayoutsComponent, {
                data: this.getIds(this.selectedPayouts),
            })
            .afterClosed()
            .pipe(filter((result) => result === 'success'))
            .subscribe(() => this.doAction.emit());
    }

    createPayout() {
        this.dialogRef
            .open(CreatePayoutComponent, {
                width: '720px',
                disableClose: true,
            })
            .afterClosed()
            .pipe(filter((result) => result === 'success'))
            .subscribe(() => this.doAction.emit());
    }

    hasRole(role: PayoutRole): boolean {
        return this.appAuthGuardService.userHasRoles([role]);
    }

    isCanPay(): boolean {
        const unpaid = this.selectedPayouts.filter((p) => p.status === PayoutStatus.unpaid);
        return this.selectedPayouts.length === unpaid.length && unpaid.length > 0;
    }

    isCanConfirm(): boolean {
        const paid = this.selectedPayouts.filter((p) => p.status === PayoutStatus.paid);
        return this.selectedPayouts.length === paid.length && paid.length > 0;
    }

    private getIds(payouts: Payout[]): string[] {
        return payouts.map((p) => p.id);
    }
}
