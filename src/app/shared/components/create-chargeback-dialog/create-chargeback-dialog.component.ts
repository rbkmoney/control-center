import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { toMinor } from '@cc/utils/index';
import { Moment } from 'moment';
import * as short from 'short-uuid';

import { InvoicePaymentChargebackCategory } from '../../../thrift-services/damsel/gen-model/domain';
import { PaymentProcessingService } from '../../../thrift-services/damsel/payment-processing.service';

@Component({
    selector: 'cc-create-chargeback-dialog',
    templateUrl: 'create-chargeback-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateChargebackDialogComponent {
    static defaultConfig: MatDialogConfig = {
        disableClose: true,
        width: '552px',
    };

    form = this.fb.group({
        date: '',
        leavyAmount: '',
        category: '',
        code: '',
    });
    categories: (keyof InvoicePaymentChargebackCategory)[] = [
        'authorisation',
        'dispute',
        'fraud',
        'processing_error',
    ];

    constructor(
        private paymentProcessingService: PaymentProcessingService,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA)
        public params: {
            invoiceID: string;
            paymentID: string;
        },
        private dialogRef: MatDialogRef<CreateChargebackDialogComponent>,
        private snackBar: MatSnackBar
    ) {}

    create() {
        const { leavyAmount, code, category, date } = this.form.value;
        this.paymentProcessingService
            .createChargeback(this.params.invoiceID, this.params.paymentID, {
                id: short().new(),
                occurred_at: (date as Moment).utc().format(),
                reason: {
                    code,
                    category: { [category]: {} },
                },
                levy: {
                    amount: toMinor(leavyAmount) as any,
                    currency: { symbolic_code: 'RUB' },
                },
            })
            .subscribe(
                () => this.dialogRef.close(),
                (error) => {
                    console.error(error);
                    this.snackBar.open('An error occurred while chargeback creating', 'OK');
                }
            );
    }

    cancel() {
        this.dialogRef.close();
    }
}
