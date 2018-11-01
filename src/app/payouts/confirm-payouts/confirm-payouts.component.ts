import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

import { PayoutsService } from '../payouts.service';

@Component({
    templateUrl: 'confirm-payouts.component.html'
})
export class ConfirmPayoutsComponent {
    isLoading: boolean;

    constructor(private dialogRef: MatDialogRef<ConfirmPayoutsComponent>,
                private payoutsService: PayoutsService,
                private snackBar: MatSnackBar,
                @Inject(MAT_DIALOG_DATA)
                public payoutsIds: string[]) {
    }

    submit() {
        this.isLoading = true;
        this.payoutsService.confirm(this.payoutsIds).subscribe(() => {
            this.isLoading = false;
            this.dialogRef.close();
            this.snackBar.open('Successfully confirmed', 'OK', {duration: 3000});
        }, (error) => {
            this.isLoading = false;
            this.snackBar.open('An error occurred while confirming payouts', 'OK');
            console.error(error);
        });
    }
}
