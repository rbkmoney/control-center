import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import groupBy from 'lodash-es/groupBy';
import forEach from 'lodash-es/forEach';

import {
    EventType,
    OperationFailedPayload,
    AdjustmentOperationEvent,
    BatchPaymentAdjustmentService,
    PaymentAdjustmentCreationScope
} from '../adjustment-operations';
import { CreatePaymentAdjustmentErrorCodes } from '../adjustment-operations';

type FailedPayload = OperationFailedPayload<string, PaymentAdjustmentCreationScope>;

@Component({
    selector: 'cc-create-actions',
    templateUrl: 'create-actions.component.html'
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
        this.batchAdjustmentService.events$.subscribe(event => {
            switch (event.type) {
                case EventType.PaymentAdjustmentsCreated:
                    this.createResult = this.createResult.concat(
                        (event as AdjustmentOperationEvent<PaymentAdjustmentCreationScope>).payload
                    );
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
                                this.failedInvalidPaymentStatus = this.failedInvalidPaymentStatus.concat(
                                    payloads
                                );
                                break;
                            case Codes.InvoiceNotFound:
                                this.failedInvoiceNotFound = this.failedInvoiceNotFound.concat(
                                    payloads
                                );
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
        const captureParams = this.createResult.map(({ adjustment_id, creation_params }) => ({
            user: creation_params.user,
            invoice_id: creation_params.invoice_id,
            payment_id: creation_params.payment_id,
            adjustment_id
        }));
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
            ({ operationScope: { creation_params, adjustment_id } }) => ({
                user: creation_params.user,
                invoice_id: creation_params.invoice_id,
                payment_id: creation_params.payment_id,
                adjustment_id
            })
        );
        this.failedPending = [];
        this.batchAdjustmentService.cancel(cancelParams).subscribe(null, () => {
            this.snackBar.open('An error occurred while adjustments cancel');
        });
    }

    retryFailedInternal() {
        const createParams = this.failedInternal.map(item => item.operationScope.creation_params);
        this.failedInternal = [];
        this.batchAdjustmentService.create(createParams).subscribe(null, () => {
            this.snackBar.open('An error occurred while adjustments create');
        });
    }
}
