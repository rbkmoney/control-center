import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { mergeMap, shareReplay } from 'rxjs/operators';

import { DomainService } from '../domain';
import { QueryDSL } from '../query-dsl';
import { StatPayment, StatResponse } from '../thrift-services/damsel/gen-model/merch_stat';
import { MerchantStatisticsService } from '../thrift-services/damsel/merchant-statistics.service';
import { SearchFormParams } from './search-form/search-form-params';

@Injectable()
export class PaymentAdjustmentService {
    searchPaymentChanges$: Subject<StatPayment[]> = new Subject<StatPayment[]>();

    domainVersion$: Observable<number> = this.domainService.version$.pipe(shareReplay(1));

    constructor(
        private merchantStatisticsService: MerchantStatisticsService,
        private domainService: DomainService
    ) {}

    fetchPayments(params: SearchFormParams): Observable<StatPayment[]> {
        return this.getAllPayments(params);
    }

    private getAllPayments(
        params: SearchFormParams,
        continuationToken?: string,
        payments: StatPayment[] = []
    ): Observable<StatPayment[]> {
        return this.getPayments(params, continuationToken).pipe(
            mergeMap((res) => {
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
            invoiceIds,
            providerID,
            terminalID,
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
                        ...(providerID ? { payment_provider_id: providerID } : {}),
                        ...(terminalID ? { payment_terminal_id: terminalID } : {}),
                        ...(status ? { payment_status: status } : {}),
                        ...(invoiceIds ? { invoice_ids: invoiceIds } : {}),
                    },
                },
            } as QueryDSL),
            ...(continuationToken ? { continuation_token: continuationToken } : {}),
        });
    }
}
