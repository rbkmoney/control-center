import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { SearchFormParams } from './search-form/search-form-params';
import { MerchantStatisticsService } from '../thrift/merchant-statistics.service';
import { StatPayment, StatResponse } from '../gen-damsel/merch_stat';
import { QueryDSL } from '../query-dsl';

@Injectable()
export class PaymentAdjustmentService {
    searchPaymentChanges$: Subject<StatPayment[]> = new Subject<StatPayment[]>();

    constructor(private merchantStatisticsService: MerchantStatisticsService) {}

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
