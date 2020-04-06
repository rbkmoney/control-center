import { ExecErrorResult, ExecResultType } from '../executor.service';
import {
    AdjustmentOperationEvent,
    EventType,
    OperationError,
    OperationFailedPayload
} from './adjustment-event';
import { AdjustmentOperationService } from './adjustment-operation.service';
import { PaymentAdjustmentCaptureParams } from './adjustment-params';
import { CapturePaymentAdjustmentErrorCodes } from './error-codes';
import { ExecResultGroup } from './exec-result-group';

export class CaptureAdjustmentService extends AdjustmentOperationService {
    protected toExecParams(captureParams: any[]): any[] {
        return captureParams.map(params => ({
            fn: this.manager.capturePaymentAdjustment,
            context: this.manager,
            params
        }));
    }

    protected handleExecResult(group: ExecResultGroup): void {
        const { success, error } = group;
        if (success) {
            this.events$.next({
                type: EventType.PaymentAdjustmentsCaptured,
                operationType: ExecResultType.success,
                payload: success.map(({ container: { params } }) => params)
            } as AdjustmentOperationEvent<PaymentAdjustmentCaptureParams>);
        }
        if (error) {
            this.events$.next({
                type: EventType.CapturePaymentAdjustmentFailed,
                operationType: ExecResultType.error,
                payload: this.toErrorPayload(error)
            } as OperationError<CapturePaymentAdjustmentErrorCodes | 'InternalServer', PaymentAdjustmentCaptureParams>);
        }
    }

    private toErrorPayload(result: ExecErrorResult[]): OperationFailedPayload[] {
        return result.map(error => {
            const {
                exception,
                container: { params }
            } = error;
            const errorCodes = [
                'InvalidUser',
                'InvoiceNotFound',
                'InvoicePaymentNotFound',
                'InvoicePaymentAdjustmentNotFound',
                'InvalidPaymentAdjustmentStatus'
            ];
            return {
                code: errorCodes.includes(exception.name) ? exception.name : 'InternalServer',
                operationScope: params
            };
        });
    }
}
