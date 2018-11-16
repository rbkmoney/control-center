import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

import { PayoutsService } from '../payouts.service';

@Component({
    templateUrl: 'pay-payouts.component.html'
})
export class PayPayoutsComponent {
    isLoading: boolean;

    constructor(private dialogRef: MatDialogRef<PayPayoutsComponent, 'success'>,
                private payoutsService: PayoutsService,
                private snackBar: MatSnackBar,
                @Inject(MAT_DIALOG_DATA)
                public payoutsIds: string[]) {
    }

    submit() {
        this.isLoading = true;
        this.payoutsService.pay(this.payoutsIds).subscribe(() => {
            this.isLoading = false;
            this.dialogRef.close('success');
            this.snackBar.open('Successfully payed', 'OK', {duration: 3000});
        }, (error) => {
            this.isLoading = false;
            this.snackBar.open('An error occurred while payout pay', 'OK');
            console.error(error);
        });
    }
}
