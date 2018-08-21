import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { CreatePayoutService } from './create-payout.service';
import { PayoutsService } from '../../papi/payouts.service';

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
            const formValues = this.form.value;
            const payoutParams = {
                ...formValues,
                fromTime: this.createPayoutService.convertDate(formValues.fromTime),
                toTime: this.createPayoutService.convertDate(formValues.toTime)
            };
            this.isLoading = true;
            this.payoutService.createPayout(payoutParams).subscribe(() => {
                this.dialogRef.close();
                this.isLoading = false;
            }, (error) => {
                this.isLoading = false;
                this.handleError(error);
            });
        }
    }

    close() {
        this.dialogRef.close();
    }

    private handleError(error: any) {
        const message = error.message;
        this.snackBar.open(`${message ? message : 'Error'}`, 'OK');
        console.error(error);
    }
}
