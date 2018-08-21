import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup } from '@angular/forms';

import { PayoutsService } from '../../papi/payouts.service';
import { AcceptPayoutsService } from './accept-payouts.service';

@Component({
    templateUrl: 'accept-payouts.component.html',
    providers: [AcceptPayoutsService, PayoutsService]
})
export class AcceptPayoutsComponent implements OnInit {

    form: FormGroup;
    isLoading: boolean;

    constructor(@Inject(MAT_DIALOG_DATA)
                private data: string[],
                private dialogRef: MatDialogRef<AcceptPayoutsComponent>,
                private createPayoutsReportsService: AcceptPayoutsService,
                private payoutService: PayoutsService,
                private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.form = this.createPayoutsReportsService.createPayoutGroup;
        this.form.setValue({ids: this.data.join(',')});
    }

    submit() {
        if (this.form.valid) {
            const payoutIds = this.form.value.ids.split(',');
            this.isLoading = true;
            this.payoutService.createPayoutsReports(payoutIds).subscribe(() => {
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
