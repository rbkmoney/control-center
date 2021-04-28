import { Injectable } from '@angular/core';
import { FetchResult, PartialFetcher } from '@rbkmoney/partial-fetcher';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { booleanDelay } from '@cc/utils/boolean-delay';

import { QueryDsl } from '../../../query-dsl';
import { StatRefund } from '../../../thrift-services/damsel/gen-model/merch_stat';
import { MerchantStatisticsService } from '../../../thrift-services/damsel/merchant-statistics.service';
import { RefundsSearchParams } from './refunds-search-params';

const SEARCH_LIMIT = 5;

@Injectable()
export class FetchRefundsService extends PartialFetcher<StatRefund, RefundsSearchParams> {
    isLoading$ = this.doAction$.pipe(booleanDelay(), shareReplay(1));

    constructor(private merchantStatisticsService: MerchantStatisticsService) {
        super();
    }

    protected fetch(
        params: RefundsSearchParams,
        continuationToken: string
    ): Observable<FetchResult<StatRefund>> {
        const {
            invoiceID,
            id,
            paymentID,
            ownerID,
            shopID,
            status,
            createdAt,
            amount,
            fee,
            externalID,
            currencySymbolicCode,
        } = params;
        return this.merchantStatisticsService
            .getStatistics({
                dsl: JSON.stringify({
                    query: {
                        refunds: {
                            size: SEARCH_LIMIT.toString(),
                            ...(invoiceID ? { invoice_id: invoiceID } : {}),
                            ...(id ? { id } : {}),
                            ...(paymentID ? { payment_id: paymentID } : {}),
                            ...(ownerID ? { owner_id: ownerID } : {}),
                            ...(shopID ? { shop_id: shopID } : {}),
                            ...(status ? { status } : {}),
                            ...(amount ? { amount } : {}),
                            ...(createdAt ? { created_at: createdAt } : {}),
                            ...(fee ? { fee } : {}),
                            ...(externalID ? { external_id: externalID } : {}),
                            ...(currencySymbolicCode
                                ? { currency_symbolic_code: currencySymbolicCode }
                                : {}),
                        },
                    },
                } as QueryDsl),
                ...(continuationToken ? { continuation_token: continuationToken } : {}),
            })
            .pipe(
                map(({ data, continuation_token }) => ({
                    result: data.refunds,
                    continuationToken: continuation_token,
                }))
            );
    }
}
