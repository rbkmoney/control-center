import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { CreatePaymentAdjustmentService } from './create-payment-adjustment.service';
import { PaymentAdjustmentService } from '../payment-adjustment.service';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'cc-create-payment-adjustment',
    templateUrl: './create-payment-adjustment.component.html',
    styleUrls: ['./create-payment-adjustment.component.css']
})
export class CreatePaymentAdjustmentComponent implements OnInit {

    form: FormGroup;
    isLoading: boolean;

    constructor(private dialogRef: MatDialogRef<CreatePaymentAdjustmentComponent>,
                private createPaymentAdjustmentService: CreatePaymentAdjustmentService,
                private paymentAdjustmentService: PaymentAdjustmentService,
                private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.form = this.createPaymentAdjustmentService.createPaymentAdjustmentGroup;
    }

    submit() {

    }
}
