import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup } from '@angular/forms';

import { CancelPayoutService } from './cancel-payout.service';
import { PayoutsService } from '../payouts.service';

@Component({
    templateUrl: './cancel-payout.component.html',
    providers: [CancelPayoutService]
})
export class CancelPayoutComponent implements OnInit {
    form: FormGroup;
    isLoading: boolean;

    constructor(private dialogRef: MatDialogRef<CancelPayoutComponent>,
                private cancelPayoutDialogService: CancelPayoutService,
                private payoutsService: PayoutsService,
                private snackBar: MatSnackBar,
                @Inject(MAT_DIALOG_DATA)
                public payoutId: string) {
    }

    ngOnInit() {
        this.form = this.cancelPayoutDialogService.createFormGroup;
    }

    submit() {
        this.isLoading = true;
        this.payoutsService.cancel(this.payoutId, this.form.value).subscribe(() => {
            this.isLoading = false;
            this.dialogRef.close();
            this.snackBar.open('Successfully cancelled', 'OK', {duration: 3000});
        }, (error) => {
            this.isLoading = false;
            this.snackBar.open('An error occurred while payout cancel.', 'OK');
            console.error(error);
        });
    }

    close() {
        this.dialogRef.close();
    }
}
