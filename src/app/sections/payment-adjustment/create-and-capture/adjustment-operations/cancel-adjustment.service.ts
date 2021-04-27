import { Injectable } from '@angular/core';

import { ExecErrorResult, ExecResultType } from '../executor.service';
import {
    AdjustmentOperationEvent,
    EventType,
    OperationError,
    OperationFailedPayload,
} from './adjustment-event';
import { AdjustmentOperationService } from './adjustment-operation.service';
import { PaymentAdjustmentCancelParams } from './adjustment-params';
import { CancelPaymentAdjustmentErrorCodes } from './error-codes';
import { ExecResultGroup } from './exec-result-group';

@Injectable()
export class CancelAdjustmentService extends AdjustmentOperationService {
    protected toExecParams(cancelParams: any[]): any[] {
        return cancelParams.map((params) => ({
            fn: this.manager.cancelPaymentAdjustment,
            context: this.manager,
            params,
        }));
    }

    protected handleExecResult(group: ExecResultGroup): void {
        const { success, error } = group;
        if (success) {
            this.events$.next({
                type: EventType.PaymentAdjustmentsCancelled,
                operationType: ExecResultType.Success,
                payload: success.map(({ container: { params } }) => params),
            } as AdjustmentOperationEvent<PaymentAdjustmentCancelParams>);
        }
        if (error) {
            this.events$.next({
                type: EventType.CancelPaymentAdjustmentFailed,
                operationType: ExecResultType.Error,
                payload: this.toErrorPayload(error),
            } as OperationError<CancelPaymentAdjustmentErrorCodes | 'InternalServer', PaymentAdjustmentCancelParams>);
        }
    }

    private toErrorPayload(result: ExecErrorResult[]): OperationFailedPayload[] {
        return result.map((error) => {
            const {
                exception,
                container: { params },
            } = error;
            const errorCodes = [
                'InvalidUser',
                'InvoiceNotFound',
                'InvoicePaymentNotFound',
                'InvoicePaymentAdjustmentNotFound',
                'InvalidPaymentAdjustmentStatus',
            ];
            return {
                code: errorCodes.includes(exception.name) ? exception.name : 'InternalServer',
                operationScope: params,
            };
        });
    }
}
