import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PayoutsService } from '../payouts.service';
import { CreatePayoutService } from './create-payout.service';

@Component({
    templateUrl: 'create-payout.component.html',
    providers: [CreatePayoutService, PayoutsService]
})
export class CreatePayoutComponent implements OnInit {
    form: FormGroup;
    isLoading: boolean;

    constructor(
        private dialogRef: MatDialogRef<CreatePayoutComponent, 'success'>,
        private createPayoutService: CreatePayoutService,
        private payoutService: PayoutsService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.form = this.createPayoutService.createPayoutGroup;
    }

    submit() {
        if (this.form.valid) {
            const formValues = this.form.value;
            this.isLoading = true;
            this.payoutService.create(this.createPayoutService.makeParams(formValues)).subscribe(
                () => {
                    this.dialogRef.close('success');
                    this.isLoading = false;
                    this.snackBar.open('Successfully created', 'OK', { duration: 3000 });
                },
                error => {
                    this.isLoading = false;
                    const message = error.message;
                    this.snackBar.open(
                        `${message ? message : 'An error occurred while creating payout.'}`,
                        'OK'
                    );
                    console.error(error);
                }
            );
        }
    }
}
