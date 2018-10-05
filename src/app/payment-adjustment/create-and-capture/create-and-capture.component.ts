import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { CreateAndCaptureService } from './create-and-capture.service';
import { Payment } from '../../papi/model';
import { InvoicePaymentAdjustment, InvoicePaymentAdjustmentParams } from '../../gen-damsel/payment_processing';

@Component({
    selector: 'cc-create-and-capture-payment-adjustment',
    templateUrl: './create-and-capture.component.html',
    providers: [CreateAndCaptureService]
})
export class CreateAndCaptureComponent implements OnInit {

    form: FormGroup;

    isLoading: boolean;

    payments: Payment[];

    paymentAdjustments: InvoicePaymentAdjustment[];

    createOrCaptureSubscription: Subscription;

    @ViewChild('stepper')
    stepper;

    constructor(private dialogRef: MatDialogRef<CreateAndCaptureComponent>,
                private dialog: MatDialog,
                private createAndCaptureService: CreateAndCaptureService,
                @Inject(MAT_DIALOG_DATA) data: { payments: Payment[] },
                private snackBar: MatSnackBar) {
        this.payments = data.payments;
    }

    ngOnInit() {
        this.form = this.createAndCaptureService.createPaymentAdjustmentGroup;
    }

    create() {
        const {value} = this.form;
        const params: InvoicePaymentAdjustmentParams = {
            domainRevision: value.revision,
            reason: value.reason
        };
        this.isLoading = true;
        this.createOrCaptureSubscription = this.createAndCaptureService.create(this.payments, params).subscribe((results) => {
            this.paymentAdjustments = results;
            this.stepper.next();
            this.isLoading = false;
        }, (error) => {
            this.snackBar.open(`Could not create all payment adjustments (${error})`, 'OK');
            console.error(error);
            this.isLoading = false;
        });
    }

    capture() {
        this.isLoading = true;
        this.createOrCaptureSubscription = this.createAndCaptureService.capture(this.paymentAdjustments, this.payments).subscribe((results) => {
            this.snackBar.open(`${results.length} payment adjustment(s) captured`, 'OK', {duration: 3000});
            this.dialogRef.close();
            this.isLoading = false;
        }, (error) => {
            this.snackBar.open(`Could not capture all payment adjustments (${error})`, 'OK');
            console.error(error);
            this.isLoading = false;
        });
    }

    cancel() {
        if (this.createOrCaptureSubscription) {
            this.createOrCaptureSubscription.unsubscribe();
        }
        if (this.paymentAdjustments) {
            this.isLoading = true;
            this.createAndCaptureService.cancel(this.paymentAdjustments, this.payments).subscribe((results) => {
                this.isLoading = false;
                this.snackBar.open(`${results.length} payment adjustment(s) cancelled`, 'OK', {duration: 3000});
            }, (error) => {
                this.snackBar.open(error, 'OK');
                console.error(error);
            }, () => {
                this.dialogRef.close();
            });
        } else {
            this.dialogRef.close();
        }
    }
}
