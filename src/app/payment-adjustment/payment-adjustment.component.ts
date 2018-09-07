import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

import { PaymentAdjustmentService } from './payment-adjustment.service';
import { CreatePaymentAdjustmentComponent } from './create-payment-adjustment/create-payment-adjustment.component';

@Component({
    selector: 'cc-payment-adjustment',
    templateUrl: './payment-adjustment.component.html',
    styleUrls: ['./payment-adjustment.component.css', '../shared/container.css'],
})
export class PaymentAdjustmentComponent implements OnInit {

    private isLoading = false;

    constructor(private dialogRef: MatDialog, private paymentAdjustmentService: PaymentAdjustmentService, private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.paymentAdjustmentService.getPayments({
            fromTime: new Date().toISOString(),
            toTime: new Date().toISOString(),
            from: String(0),
            size: String(1000)
        }).subscribe(() => {
            this.isLoading = false;
        }, (e) => {
            this.isLoading = false;
            const message = e.message;
            this.snackBar.open(`${message ? message : 'Error'}`, 'OK', {duration: 3000});
            console.error(e);
        });
    }

    createPaymentAdjustment() {
        this.dialogRef.open(CreatePaymentAdjustmentComponent, {
            width: '720px',
            disableClose: true
        });
    }

}
