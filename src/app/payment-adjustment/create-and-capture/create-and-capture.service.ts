import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { catchError, map, switchMap } from 'rxjs/operators';
import { KeycloakService } from 'keycloak-angular';
import flatten from 'lodash-es/flatten';

import { InvoicePaymentAdjustmentParams, UserInfo } from '../../gen-damsel/payment_processing';
import { PaymentProcessingTypedManager } from '../../thrift/payment-processing-typed-manager';
import { Payment } from '../../papi/model';
import { InvoicePaymentAdjustment } from '../../gen-damsel/domain';

@Injectable()
export class CreateAndCaptureService {

    createPaymentAdjustmentGroup: FormGroup;

    progress$: Subject<number> = new Subject();

    constructor(
        private fb: FormBuilder,
        private paymentProcessingTypedManager: PaymentProcessingTypedManager,
        private keycloakService: KeycloakService
    ) {
        this.createPaymentAdjustmentGroup = this.prepareForm();
    }

    create(payments: Payment[], params: InvoicePaymentAdjustmentParams): Observable<InvoicePaymentAdjustment[]> {
        const user = this.getUser();
        return this.parallel(payments.map(({invoiceId, id}) => () => fromPromise(this.createPaymentAdjustment(user, invoiceId, id, params))));
    }

    capture(paymentAdjustments: InvoicePaymentAdjustment[], payments: Payment[]): Observable<void[]> {
        const user = this.getUser();
        return this.parallel(paymentAdjustments.map(({id}, idx) => () => this.paymentProcessingTypedManager.capturePaymentAdjustment(
            user,
            payments[idx].invoiceId,
            payments[idx].id,
            id
        )));
    }

    cancel(paymentAdjustments: InvoicePaymentAdjustment[], payments: Payment[]): Observable<void[]> {
        const user = this.getUser();
        return this.parallel(paymentAdjustments.map(({id}, idx) => () => this.paymentProcessingTypedManager.cancelPaymentAdjustment(
            user,
            payments[idx].invoiceId,
            payments[idx].id,
            id
        )));
    }

    private parallel<T>(funcs: Array<(...args: any[]) => Observable<T>>, concurrenciesCount = 4): Observable<T[]> {
        const tmpFuncs = funcs.slice();
        this.updateProgress(funcs.length, 0);
        const currency = (results: T[] = []) => {
            const func = tmpFuncs.pop();
            this.updateProgress(funcs.length, funcs.length - tmpFuncs.length - concurrenciesCount);
            if (func) {
                return func().pipe(
                    catchError(() => of(undefined)),
                    switchMap((nextRes: T) => currency([...results, nextRes]))
                );
            }
            return of(results);
        };
        return forkJoin((new Array(concurrenciesCount)).fill([]).map(currency)).pipe(map((res) => flatten(res)));
    }

    private updateProgress(length: number, value: number) {
        this.progress$.next(Math.min(Math.max(Math.round(value / length * 100), 0), 100));
    }

    private async createPaymentAdjustment(
        user: UserInfo, invoiceId: string,
        id: string, params: InvoicePaymentAdjustmentParams
    ): Promise<InvoicePaymentAdjustment> {
        try {
            return await this.paymentProcessingTypedManager.createPaymentAdjustment(user, invoiceId, id, params).toPromise();
        } catch (error) {
            if (error.name === 'InvoicePaymentAdjustmentPending') {
                await this.paymentProcessingTypedManager.cancelPaymentAdjustment(user, invoiceId, id, error.id).toPromise();
                return await this.paymentProcessingTypedManager.createPaymentAdjustment(user, invoiceId, id, params).toPromise();
            }
            throw error;
        }
    }

    private getUser(): UserInfo {
        return {id: this.keycloakService.getUsername(), type: {internalUser: {}}};
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            revision: ['', Validators.required],
            reason: ['', Validators.required]
        });
    }
}
