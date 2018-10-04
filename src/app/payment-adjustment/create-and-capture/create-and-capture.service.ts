import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { KeycloakService } from 'keycloak-angular';

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
        return forkJoin(payments.map(({invoiceId, id}) => fromPromise(this.createPaymentAdjustment(this.getUser(), invoiceId, id, params))));
    }

    capture(paymentAdjustments: InvoicePaymentAdjustment[], payments: Payment[]): Observable<void[]> {
        return forkJoin(paymentAdjustments.map((paymentAdjustment, idx) => this.paymentProcessingTypedManager.capturePaymentAdjustment(
            this.getUser(),
            payments[idx].invoiceId,
            payments[idx].id,
            paymentAdjustment.id
        )));
    }

    cancel(paymentAdjustments: InvoicePaymentAdjustment[], payments: Payment[]): Observable<void[]> {
        return forkJoin(paymentAdjustments.map((paymentAdjustment, idx) => this.paymentProcessingTypedManager.cancelPaymentAdjustment(
            this.getUser(),
            payments[idx].invoiceId,
            payments[idx].id,
            paymentAdjustment.id
        )));
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
