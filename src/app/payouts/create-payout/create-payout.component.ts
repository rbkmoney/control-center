import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';

import { CreatePayoutService } from './create-payout.service';
import { PayoutsService } from '../payouts.service';

@Component({
    templateUrl: 'create-payout.component.html',
    providers: [CreatePayoutService, PayoutsService]
})
export class CreatePayoutComponent implements OnInit {

    form: FormGroup;
    isLoading: boolean;

    constructor(private dialogRef: MatDialogRef<CreatePayoutComponent>,
                private createPayoutService: CreatePayoutService,
                private payoutService: PayoutsService,
                private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.form = this.createPayoutService.createPayoutGroup;
    }

    submit() {
        if (this.form.valid) {
            this.isLoading = true;
            this.payoutService.create(this.form.value).subscribe(() => {
                this.dialogRef.close();
                this.isLoading = false;
                this.snackBar.open('Successfully created', 'OK', {duration: 3000});
            }, (error) => {
                this.isLoading = false;
                const message = error.message;
                this.snackBar.open(`${message ? message : 'An error occurred while creating payout.'}`, 'OK');
                console.error(error);
            });
        }
    }

    close() {
        this.dialogRef.close();
    }
}
