import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup } from '@angular/forms';

import { CancelDialogService } from './cancel-dialog.service';
import { PayoutsService } from '../payouts.service';

@Component({
    templateUrl: './cancel-dialog.component.html',
    providers: [CancelDialogService]
})
export class CancelDialogComponent implements OnInit {
    form: FormGroup;
    isLoading: boolean;

    constructor(private dialogRef: MatDialogRef<CancelDialogComponent>,
                private cancelPayoutDialogService: CancelDialogService,
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
        this.payoutsService.cancel(this.data, this.form.value).subscribe(() => {
            this.isLoading = false;
            this.dialogRef.close();
            this.payoutsService.get(this.payoutsService.lastSearchParams$.getValue()).subscribe();
            this.snackBar.open('Successfully cancelled', 'OK', {duration: 3000});
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
