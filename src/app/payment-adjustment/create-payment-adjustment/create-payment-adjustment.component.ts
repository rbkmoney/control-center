import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CreatePaymentAdjustmentService } from './create-payment-adjustment.service';
import { Payment } from '../../papi/model';

@Component({
    selector: 'cc-create-payment-adjustment',
    templateUrl: './create-payment-adjustment.component.html',
    styleUrls: ['./create-payment-adjustment.component.css']
})
export class CreatePaymentAdjustmentComponent implements OnInit {

    isLoading: boolean;

    payments: Payment[];

    constructor(private dialogRef: MatDialogRef<CreatePaymentAdjustmentComponent>,
                private createPaymentAdjustmentService: CreatePaymentAdjustmentService,
                @Inject(MAT_DIALOG_DATA) data: { payments: Payment[] }) {
        this.payments = data.payments;
    }

    ngOnInit() {
    }

    submit() {
    }
}
