import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import isEqual from 'lodash-es/isEqual';
import { distinctUntilChanged } from 'rxjs/operators';

import { StatPayment } from '../../../thrift-services/damsel/gen-model/merch_stat';
import {
    InvoicePaymentAdjustmentParams,
    InvoicePaymentAdjustmentScenario,
    UserInfo,
} from '../../../thrift-services/damsel/gen-model/payment_processing';
import { InvoicePaymentStatus } from '../../../thrift-services/damsel/gen-model/domain';
import {
    BatchPaymentAdjustmentService,
    CancelAdjustmentService,
    CaptureAdjustmentService,
    CreateAdjustmentService,
    EventType,
} from './adjustment-operations';
import { ExecutorService } from './executor.service';

@UntilDestroy()
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

    failureCodes = [
        'authorization_failed:unknown',
        'authorization_failed:insufficient_funds',
        'authorization_failed:payment_tool_rejected:bank_card_rejected:card_expired',
        'authorization_failed:rejected_by_issuer',
        'authorization_failed:operation_blocked',
        'authorization_failed:account_stolen',
        'authorization_failed:temporarily_unavailable',
        'authorization_failed:account_limit_exceeded:number',
        'authorization_failed:account_limit_exceeded:amount',
        'authorization_failed:security_policy_violated',
        'preauthorization_failed',
        'authorization_failed:payment_tool_rejected:bank_card_rejected:cvv_invalid',
        'authorization_failed:account_not_found',
        'authorization_failed:payment_tool_rejected:bank_card_rejected:card_number_invalid',
        'authorization_failed:rejected_by_issuer',
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
        this.batchAdjustmentService.events$.pipe(untilDestroyed(this)).subscribe((event) => {
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
        this.form.valueChanges
            .pipe(distinctUntilChanged(isEqual), untilDestroyed(this))
            .subscribe((formValue) => {
                formValue?.status_change === 'failed'
                    ? this.form.addControl('failure_code', new FormControl(''))
                    : this.form.removeControl('failure_code');
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
        this.batchAdjustmentService
            .create(createParams)
            .pipe(untilDestroyed(this))
            .subscribe({
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
                const { status_change, failure_code } = this.form.value;
                const targetStatus: InvoicePaymentStatus = { [status_change]: {} };
                if (status_change === 'failed') {
                    targetStatus.failed = {
                        failure: {
                            failure: {
                                code: failure_code,
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
