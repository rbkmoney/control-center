import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Payment } from '../papi/model';
import { ReportService } from '../papi/report.service';
import { SearchFormParams } from './search-form/search-form-params';

@Injectable()
export class PaymentAdjustmentService {

    payments$: Subject<Payment[]> = new Subject();

    constructor(private reportService: ReportService) {
    }

    getFilteredPayments(payments: Payment[], invoicesIds?: string[]) {
        return invoicesIds && invoicesIds.length
            ? payments.filter((payment) => invoicesIds.find((id) => id === payment.invoiceId))
            : payments;
    }

    getPayments(params: SearchFormParams, size?: number): void {
        const {invoiceId, paymentDomainRevision, ...restParams} = params;
        this.payments$.next(null);
        this.reportService.getPayments({
            ...restParams,
            ...(paymentDomainRevision && paymentDomainRevision.length ? {paymentDomainRevision: paymentDomainRevision[0]} : {}),
            from: '0',
            size: String('1')
        })
            .subscribe(
                (response) => this.payments$.next(this.getFilteredPayments(response, invoiceId)),
                (e) => this.payments$.next([])
            );
    }
}
