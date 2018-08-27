import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { PayoutsService } from '../payouts.service';

@Component({
    templateUrl: 'confirm-dialog.component.html'
})
export class ConfirmDialogComponent {
    isLoading: boolean;

    constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>,
                private payoutsService: PayoutsService,
                private snackBar: MatSnackBar,
                @Inject(MAT_DIALOG_DATA)
                public data: string[]) {
    }

    submit() {
        this.isLoading = true;
        this.payoutsService.confirm(this.data).subscribe(() => {
            this.isLoading = false;
            this.dialogRef.close();
            this.snackBar.open('Successfully confirmed', 'OK', {duration: 3000});
        }, (error) => {
            this.isLoading = false;
            this.snackBar.open('An error occured', 'OK', {duration: 3000});
            console.error(error);
        });
    }

    close() {
        this.dialogRef.close();
    }
}
