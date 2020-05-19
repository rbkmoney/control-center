import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import forEach from 'lodash-es/forEach';
import groupBy from 'lodash-es/groupBy';

import {
    BatchPaymentAdjustmentService,
    CancelPaymentAdjustmentErrorCodes,
    EventType,
    OperationFailedPayload,
    PaymentAdjustmentCaptureParams,
} from '../adjustment-operations';

type FailedPayload = OperationFailedPayload<string, PaymentAdjustmentCaptureParams>;

@Component({
    selector: 'cc-capture-actions',
    templateUrl: 'capture-actions.component.html',
})
export class CaptureActionsComponent implements OnInit {
    @Input()
    isLoading = false;

    failedInvalidUser: FailedPayload[] = [];
    failedInvoiceNotFound: FailedPayload[] = [];
    failedPaymentNotFound: FailedPayload[] = [];
    failedAdjustmentNotFound: FailedPayload[] = [];
    failedAdjustmentStatus: FailedPayload[] = [];
    failedInternal: FailedPayload[] = [];

    constructor(
        private batchAdjustmentService: BatchPaymentAdjustmentService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.batchAdjustmentService.events$.subscribe((event) => {
            switch (event.type) {
                case EventType.PaymentAdjustmentsCaptured:
                    this.snackBar.open(
                        `${event.payload.length} payment(s) successfully captured`,
                        'OK',
                        { duration: 3000 }
                    );
                    break;
                case EventType.CapturePaymentAdjustmentFailed:
                    const infoGroup = groupBy<any>(event.payload, 'code');
                    const Codes = CancelPaymentAdjustmentErrorCodes;
                    forEach(infoGroup, (payloads, code) => {
                        switch (code) {
                            case Codes.InvalidUser:
                                this.failedInvalidUser = this.failedInvalidUser.concat(payloads);
                                break;
                            case Codes.InvoiceNotFound:
                                this.failedInvoiceNotFound = this.failedInvoiceNotFound.concat(
                                    payloads
                                );
                                break;
                            case Codes.InvoicePaymentNotFound:
                                this.failedPaymentNotFound = this.failedPaymentNotFound.concat(
                                    payloads
                                );
                                break;
                            case Codes.InvoicePaymentAdjustmentNotFound:
                                this.failedAdjustmentNotFound = this.failedAdjustmentNotFound.concat(
                                    payloads
                                );
                                break;
                            case Codes.InvalidPaymentAdjustmentStatus:
                                this.failedAdjustmentStatus = this.failedAdjustmentStatus.concat(
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

    retry() {
        const captureParams = this.failedInternal.map(({ operationScope }) => operationScope);
        this.failedInternal = [];
        this.batchAdjustmentService.capture(captureParams).subscribe({
            error: () => {
                this.snackBar.open('An error occurred while adjustments capture');
            },
        });
    }
}
