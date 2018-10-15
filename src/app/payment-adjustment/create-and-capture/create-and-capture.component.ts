import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import groupBy from 'lodash-es/groupBy';
import { KeycloakService } from 'keycloak-angular';

import {
    CancelPaymentAdjustmentFailed,
    CancelPaymentAdjustmentFailedInfo,
    CapturePaymentAdjustmentFailed,
    CapturePaymentAdjustmentFailedInfo,
    CreateAndCaptureService,
    CreatePaymentAdjustmentFailed,
    CreatePaymentAdjustmentFailedInfo,
    EventType,
    PaymentAdjustmentCancelParams,
    PaymentAdjustmentsCancelled,
    PaymentAdjustmentsCreated,
    PaymentAdjustmentsCreationResult
} from './create-and-capture.service';
import { UserInfo } from '../../gen-damsel/payment_processing';
import { StatPayment } from '../../gen-damsel/merch_stat';
import { ExecutorService } from './executor.service';

@Component({
    selector: 'cc-create-and-capture-payment-adjustment',
    templateUrl: './create-and-capture.component.html',
    providers: [
        CreateAndCaptureService,
        ExecutorService
    ]
})
export class CreateAndCaptureComponent implements OnInit {

    form: FormGroup;

    isLoading: boolean;

    payments: StatPayment[];

    progress$: Subject<number>;

    @ViewChild('stepper')
    stepper;

    creationResult: PaymentAdjustmentsCreationResult[] = [];

    failedPending: CreatePaymentAdjustmentFailedInfo[] = [];
    internalError: CreatePaymentAdjustmentFailedInfo[] = [];

    cancelledAdjustmentParams: PaymentAdjustmentCancelParams[] = [];
    cancelPaymentAdjustmentInternalError: CancelPaymentAdjustmentFailedInfo[] = [];

    capturePaymentAdjustmentInternalError: CapturePaymentAdjustmentFailedInfo[] = [];

    private createOrCapture: Subscription;

    constructor(private dialogRef: MatDialogRef<CreateAndCaptureComponent>,
                private dialog: MatDialog,
                private createAndCaptureService: CreateAndCaptureService,
                @Inject(MAT_DIALOG_DATA) data: StatPayment[],
                private snackBar: MatSnackBar,
                private keycloakService: KeycloakService) {
        this.payments = data;
    }

    ngOnInit() {
        const {form, progress$} = this.createAndCaptureService;
        this.form = form;
        this.progress$ = progress$;
        this.createAndCaptureService.events$.subscribe((event) => {
            switch (event.type) {
                case EventType.PaymentAdjustmentsCreated:
                    this.creationResult = this.creationResult.concat((event as PaymentAdjustmentsCreated).result);
                    break;
                case EventType.CreatePaymentAdjustmentFailed:
                    const infoGroup = groupBy((event as CreatePaymentAdjustmentFailed).info, 'code');
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
                    this.cancelledAdjustmentParams = this.cancelledAdjustmentParams.concat((event as PaymentAdjustmentsCancelled).cancelArgs);
                    break;
                case EventType.CancelPaymentAdjustmentFailed:
                    const cancelPaymentAdjustmentFailedGroup = groupBy((event as CancelPaymentAdjustmentFailed).info, 'code');
                    const cancelPaymentAdjustmentInternalError = cancelPaymentAdjustmentFailedGroup['InternalServer'];
                    if (cancelPaymentAdjustmentInternalError) {
                        this.cancelPaymentAdjustmentInternalError = this.cancelPaymentAdjustmentInternalError.concat(cancelPaymentAdjustmentInternalError);
                    }
                    break;
                case EventType.CapturePaymentAdjustmentFailed:
                    const capturePaymentAdjustmentFailedGroup = groupBy((event as CapturePaymentAdjustmentFailed).info, 'code');
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
        this.createOrCapture = this.createAndCaptureService.create(createParams).subscribe(() => {
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
        this.createOrCapture = this.createAndCaptureService.create(createParams).subscribe(() => {
            this.isLoading = false;
        });
    }

    cancelPending() {
        this.isLoading = true;
        const cancelParams = this.failedPending.map(({creationScope: {args, adjustmentId}}) => ({
            user: args.user,
            invoiceId: args.invoiceId,
            paymentId: args.paymentId,
            adjustmentId
        }));
        this.failedPending = [];
        this.createAndCaptureService.cancel(cancelParams).subscribe(() => {
            this.isLoading = false;
        });
    }

    retryFailedInternal() {
        this.isLoading = true;
        const createParams = this.internalError.map((item) => item.creationScope.args);
        this.internalError = [];
        this.createAndCaptureService.create(createParams).subscribe(() => {
            this.isLoading = false;
        });
    }

    retryCancelFailedWithInternalError() {
        this.isLoading = true;
        const cancelParams = this.cancelPaymentAdjustmentInternalError.map(({cancelArgs}) => cancelArgs);
        this.cancelPaymentAdjustmentInternalError = [];
        this.createAndCaptureService.cancel(cancelParams).subscribe(() => {
            this.isLoading = false;
        });
    }

    capture() {
        const captureParams = this.creationResult.map(({adjustment, creationArgs}) => ({
            user: creationArgs.user,
            invoiceId: creationArgs.invoiceId,
            paymentId: creationArgs.paymentId,
            adjustmentId: adjustment.id
        }));
        this.isLoading = true;
        this.creationResult = [];
        this.createOrCapture = this.createAndCaptureService.capture(captureParams).subscribe(() => {
            this.isLoading = false;
        });
    }

    retryCaptureFailedWithInternalError() {
        this.isLoading = true;
        const captureParams = this.capturePaymentAdjustmentInternalError.map(({captureArgs}) => captureArgs);
        this.capturePaymentAdjustmentInternalError = [];
        this.createAndCaptureService.capture(captureParams).subscribe(() => {
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
