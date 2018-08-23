import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup } from '@angular/forms';

import { CancelPayoutDialogService } from './cancel-payout-dialog.service';
import { PayoutsService } from '../../papi/payouts.service';

@Component({
    templateUrl: './cancel-payout-dialog.component.html',
    providers: [CancelPayoutDialogService]
})
export class CancelPayoutDialogComponent implements OnInit {
    form: FormGroup;
    isLoading: boolean;

    constructor(private dialogRef: MatDialogRef<CancelPayoutDialogComponent>,
                private cancelPayoutDialogService: CancelPayoutDialogService,
                private payoutsService: PayoutsService,
                private snackBar: MatSnackBar,
                @Inject(MAT_DIALOG_DATA)
                public data: string) {
    }

    ngOnInit() {
        this.form = this.cancelPayoutDialogService.createFormGroup;
    }

    submit() {
        this.isLoading = true;
        this.payoutsService.cancelPayout(this.data, this.form.value).subscribe(() => {
            this.isLoading = false;
            this.payoutsService.getPayouts(this.payoutsService.lastSearchParams$.getValue());
            this.dialogRef.close();
            this.snackBar.open('Successfully cancelled', 'OK');
        }, () => {
            this.isLoading = false;
            this.snackBar.open('An error occured', 'OK');
        });
    }

    close() {
        this.dialogRef.close();
    }
}
