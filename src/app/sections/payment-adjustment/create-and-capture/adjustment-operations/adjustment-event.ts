import { ExecResultType } from '../executor.service';

export enum EventType {
    BatchOperationStarted = 'BatchOperationStarted',
    BatchOperationFinished = 'BatchOperationFinished',
    BatchOperationFailed = 'BatchOperationFailed',
    PaymentAdjustmentsCreated = 'PaymentAdjustmentsCreated',
    PaymentAdjustmentsCancelled = 'PaymentAdjustmentsCancelled',
    PaymentAdjustmentsCaptured = 'PaymentAdjustmentsCaptured',
    CreatePaymentAdjustmentFailed = 'CreatePaymentAdjustmentFailed',
    CancelPaymentAdjustmentFailed = 'CancelPaymentAdjustmentFailed',
    CapturePaymentAdjustmentFailed = 'CapturePaymentAdjustmentFailed',
}

export type OperationType = ExecResultType;

export interface AdjustmentOperationEvent<T = any> {
    type: EventType;
    operationType?: OperationType;
    payload?: T[];
}

export interface OperationFailedPayload<C = any, S = any> {
    code: C;
    operationScope: S;
}

export type OperationError<C, S> = AdjustmentOperationEvent<OperationFailedPayload<C, S>>;
