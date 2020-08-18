import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BankCardTokenProvider, PaymentTool, BankCardPaymentSystem } from '../../../../thrift-services/damsel/gen-model/domain';

@Component({
    templateUrl: 'other-filters-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtherFiltersDialogComponent implements OnInit {
    defaultParams = {
        payerEmail: '',
        terminalID: '',
        providerID: '',
        paymentStatus: '',
        // domainRevisionFrom: '',
        // domainRevisionTo: '',
        // paymentAmountFrom: '',
        // paymentAmountTo: '',
        // paymentMethod: '',
        // paymentSystem: '',
    };

    form: FormGroup;

    paymentStatuses = ['pending', 'processed', 'captured', 'cancelled', 'refunded', 'failed'];
    paymentMethods: PaymentTool[] = [];
    tokenProviders: BankCardTokenProvider[] = [];
    paymentSystems: BankCardPaymentSystem[] = [];

    constructor(
        private fb: FormBuilder,
        private snackBar: MatSnackBar,
        private dialogRef: MatDialogRef<OtherFiltersDialogComponent>
    ) {

    }

    ngOnInit() {
        this.form = this.fb.group(this.defaultParams);
        console.log(this.form)
    }
}
