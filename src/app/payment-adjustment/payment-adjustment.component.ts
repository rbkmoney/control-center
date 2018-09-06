import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreatePaymentAdjustmentComponent } from './create-payment-adjustment/create-payment-adjustment.component';

@Component({
    selector: 'cc-payment-adjustment',
    templateUrl: './payment-adjustment.component.html',
    styleUrls: ['./payment-adjustment.component.css', '../shared/container.css']
})
export class PaymentAdjustmentComponent implements OnInit {

    constructor(private dialogRef: MatDialog) {
    }

    ngOnInit() {
    }

    createPaymentAdjustment() {
        this.dialogRef.open(CreatePaymentAdjustmentComponent, {
            width: '720px',
            disableClose: true
        });
    }

}
