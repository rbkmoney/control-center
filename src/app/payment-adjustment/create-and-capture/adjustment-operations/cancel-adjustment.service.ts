import { AdjustmentOperationService } from './adjustment-operation.service';
import { ExecErrorResult, ExecResultType } from '../executor.service';
import {
    AdjustmentOperationEvent,
    EventType,
    OperationError,
    OperationFailedPayload
} from './adjustment-event';
import { CancelPaymentAdjustmentErrorCodes } from './error-codes';
import { ExecResultGroup } from './exec-result-group';
import { PaymentAdjustmentCancelParams } from './adjustment-params';

export class CancelAdjustmentService extends AdjustmentOperationService {

    protected toExecParams(cancelParams: any[]): any[] {
        return cancelParams.map((params) => ({
            fn: this.manager.cancelPaymentAdjustment,
            context: this.manager,
            params
        }));
    }

    protected handleExecResult(group: ExecResultGroup): void {
        const {success, error} = group;
        if (success) {
            this.events$.next({
                type: EventType.PaymentAdjustmentsCancelled,
                operationType: ExecResultType.success,
                payload: success.map(({container: {params}}) => params)
            } as AdjustmentOperationEvent<PaymentAdjustmentCancelParams>);
        }
        if (error) {
            this.events$.next({
                type: EventType.CancelPaymentAdjustmentFailed,
                operationType: ExecResultType.error,
                payload: this.toErrorPayload(error)
            } as OperationError<CancelPaymentAdjustmentErrorCodes | 'InternalServer', PaymentAdjustmentCancelParams>);
        }
    }

    private toErrorPayload(result: ExecErrorResult[]): OperationFailedPayload[] {
        return result.map((error) => {
            const {exception, container: {params}} = error;
            const errorCodes = [
                'InvalidUser',
                'InvoiceNotFound',
                'InvoicePaymentNotFound',
                'InvoicePaymentAdjustmentNotFound',
                'InvalidPaymentAdjustmentStatus'
            ];
            return {
                code: errorCodes.includes(exception.name)
                    ? exception.name
                    : 'InternalServer',
                operationScope: params
            };
        });
    }
}
