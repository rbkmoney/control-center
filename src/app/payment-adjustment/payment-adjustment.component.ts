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

    constructor(
        private dialogRef: MatDialog,
        private paymentAdjustmentService: PaymentAdjustmentService,
        private snackBar: MatSnackBar
    ) {
    }

    createAndCapturePaymentAdjustment() {
        this.dialogRef.open(CreateAndCaptureComponent, {
            width: '720px',
            disableClose: true,
            data: { payments: this.selectedPayments }
        });
    }

    changeSelected(e) {
        this.selectedPayments = e;
    }

    search(params: SearchFormParams) {
        this.isLoading = true;
        this.paymentAdjustmentService.fetchPayments(params).subscribe((payments) => {
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

    change() {
        this.payments = [];
        this.selectedPayments = [];
    }
}
