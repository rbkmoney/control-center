import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { CreatePaymentAdjustmentService } from './create-payment-adjustment.service';
import { PaymentAdjustmentService } from '../payment-adjustment.service';
import { FormGroup } from '@angular/forms';
import { Payment } from '../../papi/model';

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
                private createPaymentAdjustmentService: CreatePaymentAdjustmentService,
                @Inject(MAT_DIALOG_DATA) data: { payments: Payment[] },
                private paymentAdjustmentService: PaymentAdjustmentService,
                private snackBar: MatSnackBar) {
        this.payments = data.payments;
    }

    ngOnInit() {
        this.form = this.createPaymentAdjustmentService.createPaymentAdjustmentGroup;
    }

    submit() {

    }
}
