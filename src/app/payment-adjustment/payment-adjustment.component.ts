import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PaymentAdjustmentService } from './payment-adjustment.service';
import { CreateAndCaptureComponent } from './create-and-capture/create-and-capture.component';
import { StatPayment } from '../thrift-services/damsel/gen-model/merch_stat';
import { SearchFormParams } from './search-form/search-form-params';

@Component({
    selector: 'cc-payment-adjustment',
    templateUrl: './payment-adjustment.component.html',
    styleUrls: []
})
export class PaymentAdjustmentComponent implements OnInit {
    isLoading = false;

    payments: StatPayment[] = [];

    selectedPayments: StatPayment[] = [];

    searchParams: SearchFormParams;

    formValid: boolean;

    version: number;

    constructor(
        private dialogRef: MatDialog,
        private paymentAdjustmentService: PaymentAdjustmentService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.paymentAdjustmentService.searchPaymentChanges$.subscribe(payments => {
            this.payments = payments;
        });
    }

    formValueChanges(params: SearchFormParams) {
        this.searchParams = params;
    }

    formStatusChanges(status: string) {
        this.formValid = status === 'VALID';
    }

    create() {
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
        this.payments = [];
        this.selectedPayments = [];
        this.isLoading = true;
        this.paymentAdjustmentService.fetchPayments(this.searchParams).subscribe(
            () => {
                this.selectedPayments = [];
                this.isLoading = false;
            },
            e => {
                this.snackBar.open(`${e.message || 'Error'}`, 'OK');
                this.isLoading = false;
                console.error(e);
            }
        );
    }
}
