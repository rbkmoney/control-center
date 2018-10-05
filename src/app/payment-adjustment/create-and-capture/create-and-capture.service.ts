import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { KeycloakService } from 'keycloak-angular';
import flatten from 'lodash-es/flatten';

import { InvoicePaymentAdjustmentParams, UserInfo } from '../../gen-damsel/payment_processing';
import { PaymentProcessingTypedManager } from '../../thrift/payment-processing-typed-manager';
import { Payment } from '../../papi/model';
import { InvoicePaymentAdjustment } from '../../gen-damsel/domain';

@Injectable()
export class CreateAndCaptureService {

    createPaymentAdjustmentGroup: FormGroup;

    constructor(
        private fb: FormBuilder,
        private paymentProcessingTypedManager: PaymentProcessingTypedManager,
        private keycloakService: KeycloakService
    ) {
        this.createPaymentAdjustmentGroup = this.prepareForm();
    }

    create(payments: Payment[], params: InvoicePaymentAdjustmentParams): Observable<InvoicePaymentAdjustment[]> {
        const user = this.getUser();
        return fromPromise(
            this.parallel(payments.map(({invoiceId, id}) => () => this.createPaymentAdjustment(user, invoiceId, id, params)))
        );
    }

    capture(paymentAdjustments: InvoicePaymentAdjustment[], payments: Payment[]): Observable<void[]> {
        const user = this.getUser();
        return fromPromise(
            this.parallel(paymentAdjustments.map(({id}, idx) => () => this.paymentProcessingTypedManager.capturePaymentAdjustment(
                user,
                payments[idx].invoiceId,
                payments[idx].id,
                id
            ).toPromise()))
        );
    }

    cancel(paymentAdjustments: InvoicePaymentAdjustment[], payments: Payment[]): Observable<void[]> {
        const user = this.getUser();
        return fromPromise(
            this.parallel(paymentAdjustments.map(({id}, idx) => () => this.paymentProcessingTypedManager.cancelPaymentAdjustment(
                user,
                payments[idx].invoiceId,
                payments[idx].id,
                id
            ).toPromise()))
        );
    }

    private async parallel<T>(funcs: Array<(...args: any[]) => Promise<T>>, concurrenciesCount = 4): Promise<T[]> {
        const tmpFuncs = funcs.slice();
        const currency = async () => {
            const results: T[] = [];
            let func: typeof funcs[0];
            while (func = tmpFuncs.pop()) {
                results.push(await func());
            }
            return results;
        };
        const promises = (new Array(concurrenciesCount)).fill(undefined).map(currency);
        return flatten(await Promise.all(promises));
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
