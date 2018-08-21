import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup } from '@angular/forms';

import { CancelPayoutService } from './cancel-payout.service';
import { Payout, PayoutStatus } from '../../papi/model';
import { PayoutsService } from '../../papi/payouts.service';

@Component({
    templateUrl: './payout-dialog.template.html',
    providers: [PayoutsService, CancelPayoutService],
    styleUrls: ['./payouts-table.component.css']
})
export class PayoutDialogComponent implements OnInit {

    public payout: Payout;
    public isLoading = false;
    public isShowAcceptButton = false;
    public isCanceling = false;
    public cancelForm: FormGroup;

    constructor(private payoutService: PayoutsService,
                private cancelPayoutService: CancelPayoutService,
                private snackBar: MatSnackBar,
                private dialogRef: MatDialogRef<PayoutDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Payout) {
    }

    ngOnInit() {
        this.cancelForm = this.cancelPayoutService.createPayoutGroup;
        this.payout = this.data;
        this.setVisibilityAcceptPayoutButton(this.payout.status);
    }

    acceptPayout() {
        this.isLoading = true;
        this.payoutService.acceptPayout(this.payout.id).subscribe(() => {
            this.setVisibilityAcceptPayoutButton(this.payout.status);
            this.isLoading = false;
            this.payout.status = PayoutStatus.confirmed;
            this.dialogRef.close(PayoutStatus.confirmed);
        }, (error) => this.snackBar.open(`Error status: ${error.status}`, 'OK'));
    }

    toggleCancel() {
        this.isCanceling = !this.isCanceling;
    }

    cancelPayout() {
        if (this.cancelForm.valid) {
            this.isLoading = true;
            this.payoutService.cancelPayout(this.payout.id, this.cancelForm.value).subscribe(() => {
                this.isCanceling = false;
                this.isLoading = false;
                this.payout.status = PayoutStatus.cancelled;
                this.dialogRef.close(PayoutStatus.cancelled);
            }, (error) => this.handleError(error));
        }
    }

    private setVisibilityAcceptPayoutButton(status: string) {
        this.isShowAcceptButton = (status === PayoutStatus.paid);
    }

    private handleError(error: any) {
        const message = error.json().message;
        this.snackBar.open(`${message ? message : 'Error'}`, 'OK');
        console.error(error);
    }
}
