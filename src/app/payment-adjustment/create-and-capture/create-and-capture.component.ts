import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import { forkJoin, Subscription } from 'rxjs';

import { CreateAndCaptureService } from './create-and-capture.service';
import { Payment } from '../../papi/model';
import { InvoicePaymentAdjustment, InvoicePaymentAdjustmentParams, UserInfo } from '../../damsel';
import { PaymentProcessingTypedManager } from '../../thrift/payment-processing/payment-processing-typed-manager';
import { fromPromise } from 'rxjs/internal-compatibility';

@Component({
    selector: 'cc-create-and-capture-payment-adjustment',
    templateUrl: './create-and-capture.component.html',
    styleUrls: ['./create-and-capture.component.css']
})
export class CreateAndCaptureComponent implements OnInit {

    form: FormGroup;

    isLoading: boolean;

    payments: Payment[];

    paymentAdjustments: InvoicePaymentAdjustment[];

    createSubscription: Subscription;

    @ViewChild('stepper')
    stepper;

    constructor(private dialogRef: MatDialogRef<CreateAndCaptureComponent>,
                private dialog: MatDialog,
                private createAndCaptureService: CreateAndCaptureService,
                @Inject(MAT_DIALOG_DATA) data: { payments: Payment[] },
                private keycloakService: KeycloakService,
                private paymentProcessingTypedManager: PaymentProcessingTypedManager,
                private snackBar: MatSnackBar) {
        this.payments = data.payments;
    }

    ngOnInit() {
        this.form = this.createAndCaptureService.createPaymentAdjustmentGroup;
    }

    async createPaymentAdjustment(user: UserInfo, invoiceId: string, id: string, params: InvoicePaymentAdjustmentParams) {
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

    create() {
        const {value} = this.form;
        const user: UserInfo = {id: this.keycloakService.getUsername(), type: {internal_user: {}}};
        const params: InvoicePaymentAdjustmentParams = {
            domain_revision: value.revision,
            reason: value.reason
        };
        this.isLoading = true;
        const create$ = forkJoin(this.payments.map(({invoiceId, id}) => fromPromise(this.createPaymentAdjustment(user, invoiceId, id, params))));
        this.createSubscription = create$.subscribe((results) => {
            this.paymentAdjustments = results;
            this.stepper.next();
            this.isLoading = false;
        }, (error) => {
            this.snackBar.open(`Could not create all payment adjustments (${error})`, 'OK', {duration: 60000});
            console.error(error);
            this.isLoading = false;
        });
    }

    capture() {
        const user: UserInfo = {id: this.keycloakService.getUsername(), type: {internal_user: {}}};
        this.isLoading = true;
        forkJoin(this.paymentAdjustments.map((paymentAdjustment, idx) => this.paymentProcessingTypedManager.capturePaymentAdjustment(
            user,
            this.payments[idx].invoiceId,
            this.payments[idx].id,
            paymentAdjustment.id
        ))).subscribe((results) => {
            this.snackBar.open(`${results.length} payment adjustment(s) captured`, 'OK', {duration: 3000});
            this.dialogRef.close();
            this.isLoading = false;
        }, (error) => {
            this.snackBar.open(`Could not capture all payment adjustments (${error})`, 'OK', {duration: 60000});
            console.error(error);
            this.isLoading = false;
        });
    }

    cancel() {
        if (this.createSubscription) {
            this.createSubscription.unsubscribe();
        }
        if (this.paymentAdjustments) {
            const user: UserInfo = {id: this.keycloakService.getUsername(), type: {internal_user: {}}};
            this.isLoading = true;
            forkJoin(this.paymentAdjustments.map((paymentAdjustment, idx) => this.paymentProcessingTypedManager.cancelPaymentAdjustment(
                user,
                this.payments[idx].invoiceId,
                this.payments[idx].id,
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
        } else {
            this.dialogRef.close();
        }
    }
}
