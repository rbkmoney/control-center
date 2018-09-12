import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

import { Payment } from '../../papi/model';
import { UserInfo } from '../../damsel';
import { PaymentProcessingTypedManager } from '../../payment-processing/payment-processing-typed-manager';
import { InvoicePaymentAdjustment } from '../../damsel/domain/invoice-payment-adjustment';

@Component({
    selector: 'cc-payment-adjustment-capture',
    templateUrl: './capture.component.html',
    styleUrls: ['./capture.component.css']
})
export class CaptureComponent implements OnInit {

    form: FormGroup;

    isLoading: boolean;

    paymentsWithAdjustments: [Payment, InvoicePaymentAdjustment][];

    constructor(private dialogRef: MatDialogRef<CaptureComponent>,
                @Inject(MAT_DIALOG_DATA) data: { paymentsWithAdjustments: [Payment, InvoicePaymentAdjustment][]  },
                private keycloakService: KeycloakService,
                private paymentProcessingTypedManager: PaymentProcessingTypedManager,
                private snackBar: MatSnackBar) {
        this.paymentsWithAdjustments = data.paymentsWithAdjustments;
    }

    ngOnInit() {
    }

    submit() {
        const user: UserInfo = {id: this.keycloakService.getUsername(), type: {internal_user: {}}};
        this.isLoading = true;
        forkJoin(this.paymentsWithAdjustments.map(([payment, paymentAdjustment]) => this.paymentProcessingTypedManager.capturePaymentAdjustment(
            user,
            payment.invoiceId,
            payment.id,
            paymentAdjustment.id
        ))).subscribe((results) => {
            this.isLoading = false;
            this.snackBar.open(`${results.length} payment adjustment(s) captured`, 'OK', {duration: 3000});
            this.dialogRef.close();
        }, (error) => {
            this.snackBar.open(error, 'OK', {duration: 3000});
            console.error(error);
        });
    }

    cancel() {
        const user: UserInfo = {id: this.keycloakService.getUsername(), type: {internal_user: {}}};
        this.isLoading = true;
        forkJoin(this.paymentsWithAdjustments.map(([payment, paymentAdjustment]) => this.paymentProcessingTypedManager.cancelPaymentAdjustment(
            user,
            payment.invoiceId,
            payment.id,
            paymentAdjustment.id
        ))).subscribe((results) => {
            this.isLoading = false;
            this.snackBar.open(`${results.length} payment adjustment(s) cancelled`, 'OK', {duration: 3000});
        }, (error) => {
            this.snackBar.open(error, 'OK', {duration: 3000});
            console.error(error);
        }, () => {
            this.dialogRef.close();
        });
    }
}
