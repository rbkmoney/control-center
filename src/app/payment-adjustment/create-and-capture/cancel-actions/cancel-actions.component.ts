import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import forEach from 'lodash-es/forEach';
import groupBy from 'lodash-es/groupBy';

import {
    AdjustmentOperationEvent,
    BatchPaymentAdjustmentService,
    CancelPaymentAdjustmentErrorCodes,
    EventType,
    OperationFailedPayload,
    PaymentAdjustmentCancelParams
} from '../adjustment-operations';
import { InvoicePaymentAdjustmentParams } from '../../../thrift-services/damsel/gen-model/payment_processing';

type FailedPayload = OperationFailedPayload<string, PaymentAdjustmentCancelParams>;

@Component({
    selector: 'cc-cancel-actions',
    templateUrl: 'cancel-actions.component.html'
})
export class CancelActionsComponent implements OnInit {
    @Input()
    adjustmentParams: InvoicePaymentAdjustmentParams;

    @Input()
    isLoading = false;

    cancelResult: PaymentAdjustmentCancelParams[] = [];
    failedInvalidStatus: FailedPayload[] = [];
    failedAdjustmentNotFound: FailedPayload[] = [];
    failedInvoiceNotFound: FailedPayload[] = [];
    failedInvalidUser: FailedPayload[] = [];
    failedInternal: FailedPayload[] = [];
    failedInvoicePaymentNotFound: FailedPayload[] = [];

    constructor(
        private batchAdjustmentService: BatchPaymentAdjustmentService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.batchAdjustmentService.events$.subscribe(event => {
            switch (event.type) {
                case EventType.PaymentAdjustmentsCancelled:
                    this.cancelResult = this.cancelResult.concat(
                        (event as AdjustmentOperationEvent<PaymentAdjustmentCancelParams>).payload
                    );
                    break;
                case EventType.CancelPaymentAdjustmentFailed:
                    const infoGroup = groupBy<any>(event.payload, 'code');
                    const Codes = CancelPaymentAdjustmentErrorCodes;
                    forEach(infoGroup, (payloads, code) => {
                        switch (code) {
                            case Codes.InvalidPaymentAdjustmentStatus:
                                this.failedInvalidStatus = this.failedInvalidStatus.concat(
                                    payloads
                                );
                                break;
                            case Codes.InvoicePaymentAdjustmentNotFound:
                                this.failedAdjustmentNotFound = this.failedAdjustmentNotFound.concat(
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
                            case Codes.InvoicePaymentNotFound:
                                this.failedInvoicePaymentNotFound = this.failedInvoicePaymentNotFound.concat(
                                    payloads
                                );
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

    recreate() {
        const createParams = this.cancelResult.map(({ user, invoice_id, payment_id }) => ({
            user,
            invoice_id,
            payment_id,
            params: this.adjustmentParams
        }));
        this.cancelResult = [];
        this.batchAdjustmentService.create(createParams).subscribe(null, () => {
            this.snackBar.open('An error occurred while adjustments create');
        });
    }

    retry() {
        const cancelParams = this.failedInternal.map(({ operationScope }) => operationScope);
        this.failedInternal = [];
        this.batchAdjustmentService.cancel(cancelParams).subscribe(null, () => {
            this.snackBar.open('An error occurred while adjustments cancel');
        });
    }
}
