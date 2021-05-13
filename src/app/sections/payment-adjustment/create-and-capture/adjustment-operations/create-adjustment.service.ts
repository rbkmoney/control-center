import { Injectable } from '@angular/core';

import { ExecErrorResult, ExecResultType, ExecSuccessResult } from '../executor.service';
import {
    AdjustmentOperationEvent,
    EventType,
    OperationError,
    OperationFailedPayload,
} from './adjustment-event';
import { AdjustmentOperationService } from './adjustment-operation.service';
import { PaymentAdjustmentCreationParams } from './adjustment-params';
import { CreatePaymentAdjustmentErrorCodes } from './error-codes';
import { ExecResultGroup } from './exec-result-group';
import { PaymentAdjustmentCreationScope } from './payment-adjustment-creation-scope';

@Injectable()
export class CreateAdjustmentService extends AdjustmentOperationService {
    protected toExecParams(creationParams: any[]): any[] {
        return creationParams.map((params) => ({
            fn: this.manager.createPaymentAdjustment,
            context: this.manager,
            params,
        }));
    }

    protected handleExecResult(group: ExecResultGroup): void {
        const { success, error } = group;
        if (success) {
            this.events$.next({
                type: EventType.PaymentAdjustmentsCreated,
                operationType: ExecResultType.Success,
                payload: this.toSuccessPayload(success),
            } as AdjustmentOperationEvent<PaymentAdjustmentCreationScope>);
        }
        if (error) {
            this.events$.next({
                type: EventType.CreatePaymentAdjustmentFailed,
                operationType: ExecResultType.Error,
                payload: this.toErrorPayload(error),
            } as OperationError<CreatePaymentAdjustmentErrorCodes | 'InternalServer', PaymentAdjustmentCreationScope>);
        }
    }

    private toSuccessPayload(result: ExecSuccessResult[]): PaymentAdjustmentCreationScope[] {
        return result.map(
            ({ data, container: { params } }) =>
                ({
                    adjustmentId: data && data.id,
                    creationParams: params,
                } as PaymentAdjustmentCreationScope)
        );
    }

    private toErrorPayload(
        result: ExecErrorResult[]
    ): OperationFailedPayload<string, PaymentAdjustmentCreationScope>[] {
        return result.map((error) => {
            const {
                exception,
                container: { params },
            } = error;
            return {
                code: Object.values(CreatePaymentAdjustmentErrorCodes).includes(exception.name)
                    ? exception.name
                    : 'InternalServer',
                operationScope: {
                    creationParams: params as PaymentAdjustmentCreationParams,
                    adjustmentId: exception.id ? exception.id : null,
                },
            };
        });
    }
}
