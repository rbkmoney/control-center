import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import forEach from 'lodash-es/forEach';
import groupBy from 'lodash-es/groupBy';

import {
    AdjustmentOperationEvent,
    BatchPaymentAdjustmentService,
    CreatePaymentAdjustmentErrorCodes,
    EventType,
    OperationFailedPayload,
    PaymentAdjustmentCreationScope,
} from '../adjustment-operations';

type FailedPayload = OperationFailedPayload<string, PaymentAdjustmentCreationScope>;

@Component({
    selector: 'cc-create-actions',
    templateUrl: 'create-actions.component.html',
})
export class CreateActionsComponent implements OnInit {
    @Input()
    isLoading = false;

    createResult: PaymentAdjustmentCreationScope[] = [];
    failedPending: FailedPayload[] = [];
    failedInternal: FailedPayload[] = [];
    failedInvalidPaymentStatus: FailedPayload[] = [];
    failedInvoiceNotFound: FailedPayload[] = [];
    failedInvalidUser: FailedPayload[] = [];

    constructor(
        private batchAdjustmentService: BatchPaymentAdjustmentService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.batchAdjustmentService.events$.subscribe((event) => {
            switch (event.type) {
                case EventType.PaymentAdjustmentsCreated:
                    this.createResult = this.createResult.concat(
                        (event as AdjustmentOperationEvent<PaymentAdjustmentCreationScope>).payload
                    );
                    break;
                case EventType.CreatePaymentAdjustmentFailed: {
                    const infoGroup = groupBy<any>(event.payload, 'code');
                    forEach(infoGroup, (payloads, code) => {
                        switch (code) {
                            case CreatePaymentAdjustmentErrorCodes.InvoicePaymentAdjustmentPending:
                                this.failedPending = this.failedPending.concat(payloads);
                                break;
                            case CreatePaymentAdjustmentErrorCodes.InvalidPaymentStatus:
                                this.failedInvalidPaymentStatus = this.failedInvalidPaymentStatus.concat(
                                    payloads
                                );
                                break;
                            case CreatePaymentAdjustmentErrorCodes.InvoiceNotFound:
                                this.failedInvoiceNotFound = this.failedInvoiceNotFound.concat(
                                    payloads
                                );
                                break;
                            case CreatePaymentAdjustmentErrorCodes.InvalidUser:
                                this.failedInvalidUser = this.failedInvalidUser.concat(payloads);
                                break;
                            case 'InternalServer':
                                this.failedInternal = this.failedInternal.concat(payloads);
                                break;
                        }
                    });
                    break;
                }
            }
        });
    }

    capture() {
        const captureParams = this.createResult.map(
            ({ adjustmentId, creationParams: { user, invoice_id, payment_id } }) => ({
                user,
                invoice_id,
                payment_id,
                adjustment_id: adjustmentId,
            })
        );
        this.createResult = [];
        this.batchAdjustmentService.capture(captureParams).subscribe(
            () => {},
            () => {
                this.snackBar.open('An error occurred while adjustments capture');
            }
        );
    }

    cancelPending() {
        const cancelParams = this.failedPending.map(
            ({
                operationScope: {
                    adjustmentId,
                    creationParams: { user, invoice_id, payment_id },
                },
            }) => ({
                user,
                invoice_id,
                payment_id,
                adjustment_id: adjustmentId,
            })
        );
        this.failedPending = [];
        this.batchAdjustmentService.cancel(cancelParams).subscribe({
            error: () => {
                this.snackBar.open('An error occurred while adjustments cancel');
            },
        });
    }

    retryFailedInternal() {
        const createParams = this.failedInternal.map((item) => item.operationScope.creationParams);
        this.failedInternal = [];
        this.batchAdjustmentService.create(createParams).subscribe({
            error: () => {
                this.snackBar.open('An error occurred while adjustments create');
            },
        });
    }
}
