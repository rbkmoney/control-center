import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { tap } from 'rxjs/internal/operators';
import groupBy from 'lodash-es/groupBy';
import map from 'lodash-es/map';

import { InvoicePaymentAdjustmentParams, UserInfo } from '../../gen-damsel/payment_processing';
import { PaymentProcessingTypedManager } from '../../thrift/payment-processing-typed-manager';
import { InvoicePaymentAdjustment } from '../../gen-damsel/domain';
import { ExecErrorResult, ExecSuccessResult, ExecutorService } from './executor.service';

export enum CreatePaymentAdjustmentErrorCodes {
    InvoicePaymentAdjustmentPending = 'InvoicePaymentAdjustmentPending',
    InvalidPaymentStatus = 'InvalidPaymentStatus',
    InvoicePaymentNotFound = 'InvoicePaymentNotFound',
    InvoiceNotFound = 'InvoiceNotFound',
    InvalidUser = 'InvalidUser'
}

export enum CancelPaymentAdjustmentErrorCodes {
    InvalidUser = 'InvalidUser',
    InvoiceNotFound = 'InvoiceNotFound',
    InvoicePaymentNotFound = 'InvoicePaymentNotFound',
    InvoicePaymentAdjustmentNotFound = 'InvoicePaymentAdjustmentNotFound',
    InvalidPaymentAdjustmentStatus = 'InvalidPaymentAdjustmentStatus'
}

export enum CapturePaymentAdjustmentErrorCodes {
    InvalidUser = 'InvalidUser',
    InvoiceNotFound = 'InvoiceNotFound',
    InvoicePaymentNotFound = 'InvoicePaymentNotFound',
    InvoicePaymentAdjustmentNotFound = 'InvoicePaymentAdjustmentNotFound',
    InvalidPaymentAdjustmentStatus = 'InvalidPaymentAdjustmentStatus'
}

export enum EventType {
    PaymentAdjustmentsCreated = 'PaymentAdjustmentsCreated',
    CreatePaymentAdjustmentFailed = 'CreatePaymentAdjustmentFailed',
    PaymentAdjustmentsCancelled = 'PaymentAdjustmentsCancelled',
    CancelPaymentAdjustmentFailed = 'CancelPaymentAdjustmentFailed',
    PaymentAdjustmentsCaptured = 'PaymentAdjustmentsCaptured',
    CapturePaymentAdjustmentFailed = 'CapturePaymentAdjustmentFailed'
}

export interface AdjustmentManagementEvent {
    type: EventType;
}

export interface PaymentAdjustmentCreationParams {
    user: UserInfo;
    invoiceId: string;
    paymentId: string;
    params: InvoicePaymentAdjustmentParams;
}

export interface PaymentAdjustmentCancelParams {
    user: UserInfo;
    invoiceId: string;
    paymentId: string;
    adjustmentId: string;
}

export interface PaymentAdjustmentCaptureParams {
    user: UserInfo;
    invoiceId: string;
    paymentId: string;
    adjustmentId: string;
}

export interface CreatePaymentAdjustmentScope {
    args: PaymentAdjustmentCreationParams;
    adjustmentId?: string;
}

export interface CreatePaymentAdjustmentFailedInfo {
    code?: CreatePaymentAdjustmentErrorCodes;
    creationScope: CreatePaymentAdjustmentScope;
}

export interface CreatePaymentAdjustmentFailed extends AdjustmentManagementEvent {
    info: CreatePaymentAdjustmentFailedInfo[];
}

export interface PaymentAdjustmentsCreationResult {
    adjustment: InvoicePaymentAdjustment;
    creationArgs: PaymentAdjustmentCreationParams;
}

export interface PaymentAdjustmentsCreated extends AdjustmentManagementEvent {
    result: PaymentAdjustmentsCreationResult[];
}

export interface CancelPaymentAdjustmentFailedInfo {
    code?: CancelPaymentAdjustmentErrorCodes;
    cancelArgs: PaymentAdjustmentCancelParams;
}

export interface CancelPaymentAdjustmentFailed extends AdjustmentManagementEvent {
    info: CancelPaymentAdjustmentFailedInfo[];
}

export interface PaymentAdjustmentsCancelled extends AdjustmentManagementEvent {
    cancelArgs: PaymentAdjustmentCancelParams[];
}

export interface CapturePaymentAdjustmentFailedInfo {
    code?: CapturePaymentAdjustmentErrorCodes;
    captureArgs: PaymentAdjustmentCaptureParams;
}

export interface CapturePaymentAdjustmentFailed extends AdjustmentManagementEvent {
    info: CapturePaymentAdjustmentFailedInfo[];
}

@Injectable()
export class CreateAndCaptureService {

    form: FormGroup;

    progress$: Subject<number>;

    events$: Subject<AdjustmentManagementEvent> = new Subject<AdjustmentManagementEvent>();

    constructor(
        private fb: FormBuilder,
        private manager: PaymentProcessingTypedManager,
        private keycloakService: KeycloakService,
        private executorService: ExecutorService
    ) {
        this.form = this.prepareForm();
        this.progress$ = this.executorService.progress$;
    }

    create(params: PaymentAdjustmentCreationParams[]) {
        const execParams = params.map((param) => ({
            name: 'createPaymentAdjustment',
            fn: this.manager.createPaymentAdjustment,
            args: map(param, (v) => v), // сворот
            context: this.manager
        }));
        return this.executorService.exec(execParams).pipe(
            tap((results) => {
                const grouped = groupBy(results, 'type');
                const success = grouped['success'] as ExecSuccessResult[];
                if (success) {
                    this.events$.next({
                        type: EventType.PaymentAdjustmentsCreated,
                        result: success.map(({data, container: {args}}) => ({
                            adjustment: data,
                            creationArgs: {
                                user: args[0],
                                invoiceId: args[1],
                                paymentId: args[2],
                                params: args[3]
                            }
                        }))
                    } as PaymentAdjustmentsCreated);
                }
                const errors = grouped['error'] as ExecErrorResult[];
                if (errors) {
                    const info = errors.map((error) => {
                        const {exception, container: {args}} = error;
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
                            creationScope: {
                                args: { // разворот
                                    user: args[0],
                                    invoiceId: args[1],
                                    paymentId: args[2],
                                    params: args[3]
                                },
                                adjustmentId: exception.id ? exception.id : null
                            }
                        };
                    });
                    this.events$.next({
                        type: EventType.CreatePaymentAdjustmentFailed,
                        info
                    } as CreatePaymentAdjustmentFailed);
                }
            })
        );
    }

    cancel(params: PaymentAdjustmentCancelParams[]) {
        const execParams = params.map((param) => ({
            name: 'cancelPaymentAdjustment',
            fn: this.manager.cancelPaymentAdjustment,
            args: map(param, (v) => v),
            context: this.manager
        }));
        return this.executorService.exec(execParams).pipe(
            tap((results) => {
                const grouped = groupBy(results, 'type');
                const success = grouped['success'] as ExecSuccessResult[];
                if (success) {
                    this.events$.next({
                        type: EventType.PaymentAdjustmentsCancelled,
                        cancelArgs: success.map(({container: {args}}) => ({
                            user: args[0],
                            invoiceId: args[1],
                            paymentId: args[2],
                            adjustmentId: args[3]
                        }))
                    } as PaymentAdjustmentsCancelled);
                }
                const errors = grouped['error'] as ExecErrorResult[];
                if (errors) {
                    const info = errors.map((error) => {
                        const {exception, container: {args}} = error;
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
                            cancelArgs: {
                                user: args[0],
                                invoiceId: args[1],
                                paymentId: args[2],
                                adjustmentId: args[3]
                            }
                        };
                    });
                    this.events$.next({
                        type: EventType.CancelPaymentAdjustmentFailed,
                        info
                    } as CancelPaymentAdjustmentFailed);
                }
            })
        );
    }

    capture(params: PaymentAdjustmentCaptureParams[]) {
        const execParams = params.map((param) => ({
            name: 'capturePaymentAdjustment',
            fn: this.manager.capturePaymentAdjustment,
            args: map(param, (v) => v),
            context: this.manager
        }));
        return this.executorService.exec(execParams).pipe(
            tap((results) => {
                const grouped = groupBy(results, 'type');
                const success = grouped['success'] as ExecSuccessResult[];
                if (success) {
                    this.events$.next({type: EventType.PaymentAdjustmentsCaptured});
                }
                const errors = grouped['error'] as ExecErrorResult[];
                if (errors) {
                    const info = errors.map((error) => {
                        const {exception, container: {args}} = error;
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
                            captureArgs: {
                                user: args[0],
                                invoiceId: args[1],
                                paymentId: args[2],
                                adjustmentId: args[3]
                            }
                        };
                    });
                    this.events$.next({
                        type: EventType.CapturePaymentAdjustmentFailed,
                        info
                    } as CapturePaymentAdjustmentFailed);
                }
            })
        );
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            revision: ['', Validators.required],
            reason: ['', Validators.required]
        });
    }
}
