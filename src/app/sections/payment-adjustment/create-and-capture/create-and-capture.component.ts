import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';

import { StatPayment } from '../../../thrift-services/damsel/gen-model/merch_stat';
import {
    InvoicePaymentAdjustmentParams,
    InvoicePaymentAdjustmentScenario,
    UserInfo,
} from '../../../thrift-services/damsel/gen-model/payment_processing';
import {
    BatchPaymentAdjustmentService,
    CancelAdjustmentService,
    CaptureAdjustmentService,
    CreateAdjustmentService,
    EventType,
} from './adjustment-operations';
import { ExecutorService } from './executor.service';

@Component({
    selector: 'cc-create-and-capture-payment-adjustment',
    templateUrl: './create-and-capture.component.html',
    providers: [
        ExecutorService,
        BatchPaymentAdjustmentService,
        CreateAdjustmentService,
        CancelAdjustmentService,
        CaptureAdjustmentService,
    ],
})
export class CreateAndCaptureComponent implements OnInit {
    form: FormGroup;

    isLoading: boolean;

    payments: StatPayment[];

    progress$: Observable<number>;

    createStarted = false;

    adjustmentParams: InvoicePaymentAdjustmentParams;

    activeScenario: 'cash_flow' | 'status_change' = 'cash_flow';

    scenarios = ['cash_flow', 'status_change'];

    statuses = [
        'pending',
        'processed',
        'captured',
        'cancelled',
        'refunded',
        'failed',
        'charged_back',
    ];

    constructor(
        private batchAdjustmentService: BatchPaymentAdjustmentService,
        @Inject(MAT_DIALOG_DATA) data: StatPayment[],
        private snackBar: MatSnackBar,
        private keycloakService: KeycloakService,
        private fb: FormBuilder
    ) {
        this.payments = data;
    }

    ngOnInit() {
        this.form = this.fb.group({
            cash_flow: ['', Validators.required],
            reason: ['', Validators.required],
        });
        this.progress$ = this.batchAdjustmentService.progress$;
        this.batchAdjustmentService.events$.subscribe((event) => {
            switch (event.type) {
                case EventType.BatchOperationStarted:
                    this.isLoading = true;
                    break;
                case EventType.BatchOperationFailed:
                case EventType.BatchOperationFinished:
                    this.isLoading = false;
                    break;
            }
        });
    }

    onScenarioChange({ value }) {
        this.activeScenario = value;
        switch (value) {
            case 'cash_flow':
                this.form.removeControl('status_change');
                this.form.addControl('cash_flow', new FormControl(''));
                break;
            case 'status_change':
                this.form.removeControl('cash_flow');
                this.form.addControl('status_change', new FormControl(''));
                break;
        }
        this.form.updateValueAndValidity();
    }

    create() {
        this.adjustmentParams = this.getAdjustmentParams();
        this.createStarted = true;
        this.form.disable();
        const createParams = this.payments.map(({ invoice_id, id }) => ({
            user: this.getUser(),
            invoice_id,
            payment_id: id,
            params: this.adjustmentParams,
        }));
        this.batchAdjustmentService.create(createParams).subscribe({
            error: () => {
                this.form.enable();
                this.createStarted = false;
                this.snackBar.open('An error occurred while adjustments creating');
            },
        });
    }

    private getAdjustmentParams(): InvoicePaymentAdjustmentParams {
        let scenario: InvoicePaymentAdjustmentScenario;
        const { reason } = this.form.value;
        switch (this.activeScenario) {
            case 'cash_flow':
                const { cash_flow } = this.form.value;
                scenario = {
                    cash_flow: {
                        domain_revision: cash_flow,
                    },
                };
                break;
            case 'status_change':
                const { status_change } = this.form.value;
                let targetStatus = { [status_change]: {} };
                if (status_change === 'failed') {
                    targetStatus = {
                        [status_change]: {
                            failure: {
                                failure: {
                                    code: 'PAYMENT_ADJUSTMENT',
                                },
                            },
                        },
                    };
                }
                scenario = {
                    status_change: {
                        target_status: targetStatus,
                    },
                };
                break;
        }
        return {
            reason,
            scenario,
        } as InvoicePaymentAdjustmentParams;
    }

    private getUser(): UserInfo {
        return {
            id: this.keycloakService.getUsername(),
            type: { internal_user: {} },
        };
    }
}
