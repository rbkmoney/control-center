import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

import { PaymentAdjustmentService } from './payment-adjustment.service';
import { CreateAndCaptureComponent } from './create-and-capture/create-and-capture.component';
import { StatPayment } from '../gen-damsel/merch_stat';

@Component({
    selector: 'cc-payment-adjustment',
    templateUrl: './payment-adjustment.component.html',
    styleUrls: ['../shared/container.css']
})
export class PaymentAdjustmentComponent implements OnInit {

    isLoading = false;

    payments$: Observable<StatPayment[]>;

    payments: StatPayment[] = [];

    selectedPayments: StatPayment[] = [];

    constructor(
        private dialogRef: MatDialog,
        private paymentAdjustmentService: PaymentAdjustmentService,
        private snackBar: MatSnackBar
    ) {
    }

    ngOnInit() {
        this.payments$ = this.paymentAdjustmentService.payments$;
        this.payments$.subscribe(
            (payments) => {
                this.payments = payments || [];
                this.isLoading = !payments;
            }, (e) => {
                this.payments = [];
                const message = e.message;
                this.snackBar.open(`${message ? message : 'Error'}`, 'OK', {duration: 3000});
                console.error(e);
                this.isLoading = false;
            }
        );
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

}
