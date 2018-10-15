import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

import { PaymentAdjustmentService } from './payment-adjustment.service';
import { CreateAndCaptureComponent } from './create-and-capture/create-and-capture.component';
import { StatPayment } from '../gen-damsel/merch_stat';
import { SearchFormParams } from './search-form/search-form-params';

@Component({
    selector: 'cc-payment-adjustment',
    templateUrl: './payment-adjustment.component.html',
    styleUrls: ['../shared/container.css']
})
export class PaymentAdjustmentComponent {

    isLoading = false;

    payments: StatPayment[] = [];

    selectedPayments: StatPayment[] = [];

    searchParams: SearchFormParams;

    formValid: boolean;

    constructor(
        private dialogRef: MatDialog,
        private paymentAdjustmentService: PaymentAdjustmentService,
        private snackBar: MatSnackBar
    ) {
    }

    formValueChanges(params: SearchFormParams) {
        this.searchParams = params;
    }

    formStatusChanges(status: string) {
        this.formValid = status === 'VALID';
    }

    createAndCapturePaymentAdjustment() {
        this.dialogRef.open(CreateAndCaptureComponent, {
            width: '800px',
            disableClose: true,
            data: this.selectedPayments
        });
    }

    changeSelected(e) {
        this.selectedPayments = e;
    }

    search() {
        this.isLoading = true;
        this.paymentAdjustmentService.fetchPayments(this.searchParams).subscribe((payments) => {
            this.payments = payments || [];
        }, (e) => {
            this.payments = [];
            this.snackBar.open(`${e.message || 'Error'}`, 'OK');
            console.error(e);
        }, () => {
            this.selectedPayments = [];
            this.isLoading = false;
        });
    }
}
