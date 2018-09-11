import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

import { CreatePaymentAdjustmentService } from './create-payment-adjustment.service';
import { Payment } from '../../papi/model';
import { UserInfo } from '../../damsel';
import { PaymentProcessingTypedManager } from '../../payment-processing/payment-processing-typed-manager';

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
                private keycloakService: KeycloakService,
                private paymentProcessingTypedManager: PaymentProcessingTypedManager,
                private snackBar: MatSnackBar) {
        this.payments = data.payments;
    }

    ngOnInit() {
        this.form = this.createPaymentAdjustmentService.createPaymentAdjustmentGroup;
    }

    submit() {
        const {value} = this.form;
        const user: UserInfo = {id: this.keycloakService.getUsername(), type: {external_user: {}}};
        const params = {
            domain_revision: value.revision,
            reason: value.reason
        };
        this.isLoading = true;
        forkJoin(this.payments.map((payment) => this.paymentProcessingTypedManager.createPaymentAdjustment(
            user,
            payment.invoiceId,
            payment.id,
            params
        ))).subscribe((results) => {
            this.isLoading = false;
            console.dir(results);
        }, (error) => {
            this.snackBar.open(error, 'OK', {duration: 3000});
            console.error(error);
        });
    }
}
