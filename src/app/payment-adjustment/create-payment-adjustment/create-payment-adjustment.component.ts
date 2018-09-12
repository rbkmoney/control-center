import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import { forkJoin, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { CreatePaymentAdjustmentService } from './create-payment-adjustment.service';
import { Payment } from '../../papi/model';
import { InvoicePaymentAdjustmentParams, UserInfo } from '../../damsel';
import { PaymentProcessingTypedManager } from '../../payment-processing/payment-processing-typed-manager';
import { CaptureComponent } from '../capture/capture.component';
import { fromPromise } from 'rxjs/internal-compatibility';

@Component({
    selector: 'cc-create-payment-adjustment',
    templateUrl: './create-payment-adjustment.component.html',
    styleUrls: ['./create-payment-adjustment.component.css']
})
export class CreatePaymentAdjustmentComponent implements OnInit {

    form: FormGroup;

    isLoading: boolean;

    payments: Payment[];

    constructor(private dialogRef: MatDialogRef<CreatePaymentAdjustmentComponent>,
                private dialog: MatDialog,
                private createPaymentAdjustmentService: CreatePaymentAdjustmentService,
                @Inject(MAT_DIALOG_DATA) data: { payments: Payment[] },
                private keycloakService: KeycloakService,
                private paymentProcessingTypedManager: PaymentProcessingTypedManager,
                private snackBar: MatSnackBar) {
        this.payments = data.payments;
    }

    ngOnInit() {
        this.form = this.createPaymentAdjustmentService.createPaymentAdjustmentGroup;
    }

    async createCancelCreatePaymentAdjustment(user: UserInfo, invoiceId: string, id: string, params: InvoicePaymentAdjustmentParams) {
        try {
            return await this.paymentProcessingTypedManager.createPaymentAdjustment(user, invoiceId, id, params).toPromise();
        } catch (error) {
            if (error.name === 'InvoicePaymentAdjustmentPending') {
                await this.paymentProcessingTypedManager.cancelPaymentAdjustment(user, invoiceId, id, error.id).toPromise();
                return await this.paymentProcessingTypedManager.createPaymentAdjustment(user, invoiceId, id, params).toPromise();
            }
            throw error;
        }
    }

    submit() {
        const {value} = this.form;
        const user: UserInfo = {id: this.keycloakService.getUsername(), type: {internal_user: {}}};
        const params: InvoicePaymentAdjustmentParams = {
            domain_revision: value.revision,
            reason: value.reason
        };
        this.isLoading = true;
        forkJoin(this.payments.map(({invoiceId, id}) => fromPromise(this.createCancelCreatePaymentAdjustment(user, invoiceId, id, params))))
            .subscribe((results) => {
                this.isLoading = false;
                this.dialogRef.close();
                const resultsMap = results.map((paymentAdjustment, idx) => [this.payments[idx], paymentAdjustment]);
                this.dialog.open(CaptureComponent, {
                    width: '720px',
                    disableClose: true,
                    data: {paymentsWithAdjustments: resultsMap}
                });
            }, (error) => {
                this.snackBar.open(error, 'OK', {duration: 3000});
                console.error(error);
            });
    }
}
