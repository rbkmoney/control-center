import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

import { PayoutsService } from '../papi/payouts.service';
import { Payout } from '../papi/model';
import { CreatePayoutComponent } from './create-payout/create-payout.component';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
    templateUrl: 'payouts.component.html',
    styleUrls: [
        '../shared/container.css',
        './payouts.component.css']
})
export class PayoutsComponent implements OnInit {

    isGetPayoutsInProgress: boolean;
    isPayingInProgress: boolean;
    isConfirmingInProgress: boolean;
    payouts: Payout[];
    hasSelected: boolean;
    selectedPayoutsIds: string[] = [];

    constructor(private payoutsService: PayoutsService,
                private snackBar: MatSnackBar,
                private dialogRef: MatDialog) {
    }

    ngOnInit() {
        this.payoutsService.payouts$.asObservable()
            .subscribe((payouts) => this.payouts = payouts);
        this.payoutsService.isGetPayoutsInProgress$.asObservable()
            .subscribe((isGetPayoutsInProgress) => this.isGetPayoutsInProgress = isGetPayoutsInProgress);
        this.payoutsService.getPayouts();
    }

    tableOnChange(selectedPayouts: Payout[]) {
        this.hasSelected = selectedPayouts.length > 0;
        this.selectedPayoutsIds = selectedPayouts.reduce((acc, current) => acc.concat(current.id), []);
    }

    pay() {
        const dialog = this.dialogRef.open(ConfirmDialogComponent, {
            data: {
                header: 'Pay?'
            }
        });
        dialog.afterClosed().subscribe((result) => {
            if (result) {
                this.isPayingInProgress = true;
                this.payoutsService.createPayoutsReports(this.selectedPayoutsIds).subscribe(() => {
                    this.isPayingInProgress = false;
                    this.handleSuccess('Successfully payed');
                    this.payoutsService.getPayouts(this.payoutsService.lastSearchParams$.getValue());
                }, (e) => {
                    this.isPayingInProgress = false;
                    this.handleError(e);
                });
            }
        });

    }

    confirmPayouts() {
        const dialog = this.dialogRef.open(ConfirmDialogComponent, {
            data: {
                header: 'Confirm payouts?'
            }
        });
        dialog.afterClosed().subscribe((result) => {
            if (result) {
                this.isConfirmingInProgress = true;
                this.payoutsService.confirmPayouts(this.selectedPayoutsIds).subscribe(() => {
                    this.isConfirmingInProgress = false;
                    this.handleSuccess('Successfully confirmed');
                    this.payoutsService.getPayouts(this.payoutsService.lastSearchParams$.getValue());
                }, (e) => {
                    this.isConfirmingInProgress = false;
                    this.handleError(e);
                });
            }
        });
    }

    createPayout() {
        const dialog = this.dialogRef.open(CreatePayoutComponent, {
            width: '720px',
            disableClose: true
        });
        dialog.afterClosed().subscribe(() => {
        }, (e) => this.handleError(e));
    }

    isAdditionalActionInProgress() {
        return this.isConfirmingInProgress || this.isPayingInProgress;
    }

    private handleError(e: HttpErrorResponse) {
        const message = e.message;
        this.snackBar.open(`${message ? message : 'Error'}`, 'OK');
        console.error(e);
    }

    private handleSuccess(message: string) {
        this.snackBar.open(`${message ? message : 'Success'}`, 'OK');
    }
}
