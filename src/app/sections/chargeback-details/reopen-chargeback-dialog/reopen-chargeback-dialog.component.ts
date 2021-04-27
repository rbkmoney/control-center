import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { toMinor } from '@cc/utils/index';
import { InvoicePaymentChargebackStage } from 'src/app/thrift-services/damsel/gen-model/domain';
import { PaymentProcessingService } from 'src/app/thrift-services/damsel/payment-processing.service';

@Component({
    selector: 'cc-reopen-chargeback-dialog',
    templateUrl: 'reopen-chargeback-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReopenChargebackDialogComponent {
    static defaultConfig: MatDialogConfig = {
        disableClose: true,
        width: '552px',
    };

    form = this.fb.group({
        stage: '',
        leavyAmount: '',
        bodyAmount: '',
        date: '',
    });
    stages: (keyof InvoicePaymentChargebackStage)[] = ['arbitration'];

    constructor(
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA)
        public params: {
            invoiceID: string;
            paymentID: string;
            chargebackID: string;
            stage: keyof InvoicePaymentChargebackStage;
        },
        private dialogRef: MatDialogRef<ReopenChargebackDialogComponent>,
        private snackBar: MatSnackBar,
        private paymentProcessingService: PaymentProcessingService
    ) {}

    reopen() {
        const { stage, leavyAmount, bodyAmount } = this.form.value;
        this.paymentProcessingService
            .reopenChargeback(
                this.params.invoiceID,
                this.params.paymentID,
                this.params.chargebackID,
                Object.assign(
                    {},
                    !!stage && { move_to_stage: { [stage]: {} } },
                    !!bodyAmount && {
                        body: {
                            amount: toMinor(bodyAmount) as any,
                            currency: { symbolic_code: 'RUB' },
                        },
                    },
                    !!leavyAmount && {
                        levy: {
                            amount: toMinor(leavyAmount) as any,
                            currency: { symbolic_code: 'RUB' },
                        },
                    }
                )
            )
            .subscribe(
                () => this.dialogRef.close(),
                (error) => {
                    console.error(error);
                    this.snackBar.open('An error occurred while reopen chargeback', 'OK');
                }
            );
    }

    cancel() {
        this.dialogRef.close();
    }
}
