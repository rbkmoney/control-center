import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { DomainService } from '../domain';
import { QueryDSL } from '../query-dsl';
import { StatPayment, StatResponse } from '../thrift-services/damsel/gen-model/merch_stat';
import { MerchantStatisticsService } from '../thrift-services/damsel/merchant-statistics.service';
import { SearchFormParams } from './search-form/search-form-params';

@Injectable()
export class PaymentAdjustmentService {
    searchPaymentChanges$: Subject<StatPayment[]> = new Subject<StatPayment[]>();

    version: number;

    constructor(
        private merchantStatisticsService: MerchantStatisticsService,
        private domainService: DomainService
    ) {
        this.domainService.version$.subscribe(version => (this.version = version));
    }

    fetchPayments(params: SearchFormParams): Observable<StatPayment[]> {
        return this.getAllPayments(params);
    }

    private getAllPayments(
        params: SearchFormParams,
        continuationToken?: string,
        payments: StatPayment[] = []
    ): Observable<StatPayment[]> {
        return this.getPayments(params, continuationToken).pipe(
            mergeMap(res => {
                const mergedPayments = [...payments, ...res.data.payments];
                this.searchPaymentChanges$.next(mergedPayments);
                return res.continuation_token
                    ? this.getAllPayments(params, res.continuation_token, mergedPayments)
                    : of(mergedPayments);
            })
        );
    }

    private getPayments(
        params: SearchFormParams,
        continuationToken?: string
    ): Observable<StatResponse> {
        const {
            fromRevision,
            toRevision,
            partyId,
            fromTime,
            toTime,
            status,
            shopId,
            invoiceId
        } = params;
        return this.merchantStatisticsService.getPayments({
            dsl: JSON.stringify({
                query: {
                    payments: {
                        ...(partyId ? { merchant_id: partyId } : {}),
                        ...(shopId ? { shop_id: shopId } : {}),
                        from_time: fromTime,
                        to_time: toTime,
                        from_payment_domain_revision: fromRevision,
                        to_payment_domain_revision: toRevision,
                        ...(status ? { payment_status: status } : {}),
                        ...(invoiceId ? { invoice_id: invoiceId } : {})
                    }
                }
            } as QueryDSL),
            ...(continuationToken ? { continuation_token: continuationToken } : {})
        });
    }
}
