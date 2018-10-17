import { ExecErrorResult, ExecResultType, ExecSuccessResult } from '../executor.service';
import { AdjustmentOperationService } from './adjustment-operation.service';
import {
    AdjustmentOperationEvent,
    EventType,
    OperationError,
    OperationFailedPayload
} from './adjustment-event';
import { CreatePaymentAdjustmentErrorCodes } from './error-codes';
import { ExecResultGroup } from './exec-result-group';
import { PaymentAdjustmentCreationScope } from './payment-adjustment-creation-scope';

export class CreateAdjustmentService extends AdjustmentOperationService {

    protected toExecParams(creationParams: any[]): any[] {
        return creationParams.map((params) => ({
            fn: this.manager.createPaymentAdjustment,
            context: this.manager,
            params
        }));
    }

    protected handleExecResult(group: ExecResultGroup): void {
        const {success, error} = group;
        if (success) {
            this.events$.next({
                type: EventType.PaymentAdjustmentsCreated,
                operationType: ExecResultType.success,
                payload: this.toSuccessPayload(success)
            } as AdjustmentOperationEvent<PaymentAdjustmentCreationScope>);
        }
        if (error) {
            this.events$.next({
                type: EventType.CreatePaymentAdjustmentFailed,
                operationType: ExecResultType.error,
                payload: this.toErrorPayload(error)
            } as OperationError<CreatePaymentAdjustmentErrorCodes | 'InternalServer', PaymentAdjustmentCreationScope>);
        }
    }

    private toSuccessPayload(result: ExecSuccessResult[]): PaymentAdjustmentCreationScope[] {
        return result.map(({data, container: {params}}) => ({
            adjustmentId: data && data.id,
            creationParams: params
        } as PaymentAdjustmentCreationScope));
    }

    private toErrorPayload(result: ExecErrorResult[]): OperationFailedPayload[] {
        return result.map((error) => {
            const {exception, container: {params}} = error;
            const errorCodes = [
                'InvoicePaymentAdjustmentPending',
                'InvalidPaymentStatus',
                'InvoicePaymentNotFound',
                'InvoiceNotFound',
                'InvalidUser'
            ];
            return {
                code: errorCodes.includes(exception.name)
                    ? exception.name
                    : 'InternalServer',
                operationScope: {
                    creationParams: params,
                    adjustmentId: exception.id ? exception.id : null
                }
            };
        });
    }
}
