import { ExecResultType } from '../executor.service';

export enum EventType {
    PaymentAdjustmentsCreated = 'PaymentAdjustmentsCreated',
    PaymentAdjustmentsCancelled = 'PaymentAdjustmentsCancelled',
    PaymentAdjustmentsCaptured = 'PaymentAdjustmentsCaptured',
    CreatePaymentAdjustmentFailed = 'CreatePaymentAdjustmentFailed',
    CancelPaymentAdjustmentFailed = 'CancelPaymentAdjustmentFailed',
    CapturePaymentAdjustmentFailed = 'CapturePaymentAdjustmentFailed'
}

export type OperationType = ExecResultType;

export interface AdjustmentOperationEvent<T = {}> {
    type: EventType;
    operationType: OperationType;
    payload?: T[];
}

export interface OperationFailedPayload<C = {}, S = {}> {
    code: C;
    operationScope: S;
}

export interface OperationError<C, S> extends AdjustmentOperationEvent<OperationFailedPayload<C, S>> {}
