import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import groupBy from 'lodash-es/groupBy';
import forEach from 'lodash-es/forEach';

import {
    AdjustmentOperationEvent,
    BatchPaymentAdjustmentService,
    EventType,
    OperationFailedPayload,
    PaymentAdjustmentCreationScope
} from '../adjustment-operations';
import { CreatePaymentAdjustmentErrorCodes } from '../adjustment-operations';

type FailedPayload = OperationFailedPayload<string, PaymentAdjustmentCreationScope>;

@Component({
    selector: 'cc-create-actions',
    templateUrl: 'create-actions.component.html'
})
export class CreateActionsComponent implements OnInit {

    @Output()
    inProcess: EventEmitter<boolean> = new EventEmitter<boolean>();

    isLoading = false;
    createResult: PaymentAdjustmentCreationScope[] = [];
    failedPending: FailedPayload[] = [];
    failedInternal: FailedPayload[] = [];
    failedInvalidPaymentStatus: FailedPayload[] = [];
    failedInvoiceNotFound: FailedPayload[] = [];
    failedInvalidUser: FailedPayload[] = [];

    constructor(private batchAdjustmentService: BatchPaymentAdjustmentService,
                private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.batchAdjustmentService.events$.subscribe((event) => {
            switch (event.type) {
                case EventType.PaymentAdjustmentsCreated:
                    this.createResult = this.createResult.concat((event as AdjustmentOperationEvent<PaymentAdjustmentCreationScope>).payload);
                    break;
                case EventType.CreatePaymentAdjustmentFailed:
                    const infoGroup = groupBy<any>(event.payload, 'code');
                    const Codes = CreatePaymentAdjustmentErrorCodes;
                    forEach(infoGroup, (payloads, code) => {
                        switch (code) {
                            case Codes.InvoicePaymentAdjustmentPending:
                                this.failedPending = this.failedPending.concat(payloads);
                                break;
                            case Codes.InvalidPaymentStatus:
                                this.failedInvalidPaymentStatus = this.failedInvalidPaymentStatus.concat(payloads);
                                break;
                            case Codes.InvoiceNotFound:
                                this.failedInvoiceNotFound = this.failedInvoiceNotFound.concat(payloads);
                                break;
                            case Codes.InvalidUser:
                                this.failedInvalidUser = this.failedInvalidUser.concat(payloads);
                                break;
                            case 'InternalServer':
                                this.failedInternal = this.failedInternal.concat(payloads);
                                break;
                        }
                    });
                    break;
            }
        });
    }

    capture() {
        const captureParams = this.createResult.map(({adjustmentId, creationParams}) => ({
            user: creationParams.user,
            invoiceId: creationParams.invoiceId,
            paymentId: creationParams.paymentId,
            adjustmentId
        }));
        this.createResult = [];
        this.inProcess.emit(true);
        this.batchAdjustmentService.capture(captureParams).subscribe(() => {
            this.inProcess.emit(false);
        }, () => {
            this.isLoading = false;
            this.snackBar.open('An error occurred while adjustments capture');
        });
    }

    cancelPending() {
        const cancelParams = this.failedPending.map(({operationScope: {creationParams, adjustmentId}}) => ({
            user: creationParams.user,
            invoiceId: creationParams.invoiceId,
            paymentId: creationParams.paymentId,
            adjustmentId
        }));
        this.failedPending = [];
        this.inProcess.emit(true);
        this.batchAdjustmentService.cancel(cancelParams).subscribe(() => {
            this.inProcess.emit(false);
        }, () => {
            this.inProcess.emit(false);
            this.snackBar.open('An error occurred while adjustments cancel');
        });
    }

    retryFailedInternal() {
        const createParams = this.failedInternal.map((item) => item.operationScope.creationParams);
        this.failedInternal = [];
        this.inProcess.emit(true);
        this.batchAdjustmentService.create(createParams).subscribe(() => {
            this.inProcess.emit(false);
        }, () => {
            this.inProcess.emit(false);
            this.snackBar.open('An error occurred while adjustments create');
        });
    }
}
