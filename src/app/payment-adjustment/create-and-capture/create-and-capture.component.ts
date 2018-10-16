import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import groupBy from 'lodash-es/groupBy';
import { KeycloakService } from 'keycloak-angular';

import { UserInfo } from '../../gen-damsel/payment_processing';
import { StatPayment } from '../../gen-damsel/merch_stat';
import { ExecutorService } from './executor.service';
import {
    CreateAdjustmentService,
    CancelAdjustmentService,
    CaptureAdjustmentService,
    AdjustmentOperationEvent,
    EventType,
    OperationFailedPayload,
    PaymentAdjustmentCancelParams,
    PaymentAdjustmentCaptureParams,
    PaymentAdjustmentCreationScope,
    BatchPaymentAdjustmentService
} from './adjustment-operations';

@Component({
    selector: 'cc-create-and-capture-payment-adjustment',
    templateUrl: './create-and-capture.component.html',
    providers: [
        ExecutorService,
        BatchPaymentAdjustmentService,
        CreateAdjustmentService,
        CancelAdjustmentService,
        CaptureAdjustmentService
    ]
})
export class CreateAndCaptureComponent implements OnInit {

    form: FormGroup;

    isLoading: boolean;

    payments: StatPayment[];

    progress$: Subject<number>;

    creationResult: PaymentAdjustmentCreationScope[] = [];
    failedPending: OperationFailedPayload<string, PaymentAdjustmentCreationScope>[] = [];
    internalError: OperationFailedPayload<string, PaymentAdjustmentCreationScope>[] = [];

    cancelledAdjustmentParams: PaymentAdjustmentCancelParams[] = [];
    cancelPaymentAdjustmentInternalError: OperationFailedPayload<string, PaymentAdjustmentCancelParams>[] = [];

    capturePaymentAdjustmentInternalError: OperationFailedPayload<string, PaymentAdjustmentCaptureParams>[] = [];

    constructor(private dialogRef: MatDialogRef<CreateAndCaptureComponent>,
                private dialog: MatDialog,
                private batchAdjustmentService: BatchPaymentAdjustmentService,
                @Inject(MAT_DIALOG_DATA) data: StatPayment[],
                private snackBar: MatSnackBar,
                private keycloakService: KeycloakService,
                private fb: FormBuilder) {
        this.payments = data;
    }

    ngOnInit() {
        this.form = this.fb.group({
            revision: ['', Validators.required],
            reason: ['', Validators.required]
        });
        this.progress$ = this.batchAdjustmentService.progress$;
        this.batchAdjustmentService.events$.subscribe((event) => {
            switch (event.type) {
                case EventType.PaymentAdjustmentsCreated:
                    this.creationResult = this.creationResult.concat((event as AdjustmentOperationEvent<PaymentAdjustmentCreationScope>).payload);
                    break;
                case EventType.CreatePaymentAdjustmentFailed:
                    const infoGroup = groupBy<any>(event.payload, 'code');
                    const pending = infoGroup['InvoicePaymentAdjustmentPending'];
                    if (pending) {
                        this.failedPending = this.failedPending.concat(pending);
                    }
                    const internal = infoGroup['InternalServer'];
                    if (internal) {
                        this.internalError = this.internalError.concat(internal);
                    }
                    break;
                case EventType.PaymentAdjustmentsCancelled:
                    this.cancelledAdjustmentParams = this.cancelledAdjustmentParams
                        .concat((event as AdjustmentOperationEvent<PaymentAdjustmentCancelParams>).payload);
                    break;
                case EventType.CancelPaymentAdjustmentFailed:
                    const cancelPaymentAdjustmentFailedGroup = groupBy<any>(event.payload, 'code');
                    const cancelPaymentAdjustmentInternalError = cancelPaymentAdjustmentFailedGroup['InternalServer'];
                    if (cancelPaymentAdjustmentInternalError) {
                        this.cancelPaymentAdjustmentInternalError = this.cancelPaymentAdjustmentInternalError.concat(cancelPaymentAdjustmentInternalError);
                    }
                    break;
                case EventType.CapturePaymentAdjustmentFailed:
                    const capturePaymentAdjustmentFailedGroup = groupBy<any>(event.payload, 'code');
                    const capturePaymentAdjustmentInternalError = capturePaymentAdjustmentFailedGroup['InternalServer'];
                    if (capturePaymentAdjustmentInternalError) {
                        this.capturePaymentAdjustmentInternalError = this.capturePaymentAdjustmentInternalError.concat(capturePaymentAdjustmentInternalError);
                    }
                    break;
            }
        });
    }

    create() {
        const {value: {revision, reason}} = this.form;
        const params = {domainRevision: revision, reason};
        this.isLoading = true;
        const user = this.getUser();
        const createParams = this.payments.map(({invoiceId, id}) => ({
            user,
            invoiceId,
            paymentId: id,
            params
        }));
        this.batchAdjustmentService.create(createParams).subscribe(() => {
            this.isLoading = false;
        });
    }

    recreateCancelled() {
        const {value: {revision, reason}} = this.form;
        const params = {domainRevision: revision, reason};
        this.isLoading = true;
        const createParams = this.cancelledAdjustmentParams.map(({user, invoiceId, paymentId}) => ({
            user,
            invoiceId,
            paymentId,
            params
        }));
        this.cancelledAdjustmentParams = [];
        this.batchAdjustmentService.create(createParams).subscribe(() => {
            this.isLoading = false;
        });
    }

    cancelPending() {
        this.isLoading = true;
        const cancelParams = this.failedPending.map(({operationScope: {creationParams, adjustmentId}}) => ({
            user: creationParams.user,
            invoiceId: creationParams.invoiceId,
            paymentId: creationParams.paymentId,
            adjustmentId
        }));
        this.failedPending = [];
        this.batchAdjustmentService.cancel(cancelParams).subscribe(() => {
            this.isLoading = false;
        });
    }

    retryFailedInternal() {
        this.isLoading = true;
        const createParams = this.internalError.map((item) => item.operationScope.creationParams);
        this.internalError = [];
        this.batchAdjustmentService.create(createParams).subscribe(() => {
            this.isLoading = false;
        });
    }

    retryCancelFailedWithInternalError() {
        this.isLoading = true;
        const cancelParams = this.cancelPaymentAdjustmentInternalError.map(({operationScope}) => operationScope);
        this.cancelPaymentAdjustmentInternalError = [];
        this.batchAdjustmentService.cancel(cancelParams).subscribe(() => {
            this.isLoading = false;
        });
    }

    capture() {
        const captureParams = this.creationResult.map(({adjustmentId, creationParams}) => ({
            user: creationParams.user,
            invoiceId: creationParams.invoiceId,
            paymentId: creationParams.paymentId,
            adjustmentId
        }));
        this.isLoading = true;
        this.creationResult = [];
        this.batchAdjustmentService.capture(captureParams).subscribe(() => {
            this.isLoading = false;
        });
    }

    retryCaptureFailedWithInternalError() {
        this.isLoading = true;
        const captureParams = this.capturePaymentAdjustmentInternalError.map(({operationScope}) => operationScope);
        this.capturePaymentAdjustmentInternalError = [];
        this.batchAdjustmentService.capture(captureParams).subscribe(() => {
            this.isLoading = false;
        });
    }

    private getUser(): UserInfo {
        return {
            id: this.keycloakService.getUsername(),
            type: {internalUser: {}}
        };
    }
}
