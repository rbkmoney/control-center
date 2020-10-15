import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
    ChangeChargebackStatusDialogService,
    Statuses,
} from './change-chargeback-status-dialog.service';

@Component({
    selector: 'cc-change-chargeback-status-dialog',
    templateUrl: 'change-chargeback-status-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ChangeChargebackStatusDialogService],
})
export class ChangeChargebackStatusDialogComponent {
    static defaultConfig: MatDialogConfig = {
        disableClose: true,
        width: '552px',
    };

    form = this.fb.group({
        status: '',
        date: '',
    });
    statuses = Statuses;

    constructor(
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA)
        public params: {
            invoiceID: string;
            paymentID: string;
            chargebackID: string;
        },
        private dialogRef: MatDialogRef<ChangeChargebackStatusDialogComponent>,
        private snackBar: MatSnackBar,
        private changeChargebackStatusDialogService: ChangeChargebackStatusDialogService
    ) {}

    changeStatus() {
        const { status, date } = this.form.value;
        this.changeChargebackStatusDialogService
            .changeStatus({
                status,
                date: date ? date.utc().format() : undefined,
                invoiceID: this.params.invoiceID,
                paymentID: this.params.paymentID,
                chargebackID: this.params.chargebackID,
            })
            .subscribe(
                () => this.dialogRef.close(),
                (error) => {
                    console.error(error);
                    this.snackBar.open('An error occurred while chargeback changing status', 'OK');
                }
            );
    }

    cancel() {
        this.dialogRef.close();
    }
}
