import { Injectable } from '@angular/core';
import { FetchResult, PartialFetcher } from '@rbkmoney/partial-fetcher';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { booleanDelay } from '@cc/operators/index';

import { QueryDSL } from '../../../query-dsl';
import { StatPayment } from '../../../thrift-services/damsel/gen-model/merch_stat';
import { MerchantStatisticsService } from '../../../thrift-services/damsel/merchant-statistics.service';
import { SearchFiltersParams } from '../payments-search-filters/search-filters-params';

const SEARCH_LIMIT = 10;

@Injectable()
export class FetchPaymentsService extends PartialFetcher<StatPayment, SearchFiltersParams> {
    isLoading$ = this.doAction$.pipe(booleanDelay(), shareReplay(1));

    constructor(private merchantStatisticsService: MerchantStatisticsService) {
        super();
    }

    protected fetch(
        params: SearchFiltersParams,
        continuationToken: string
    ): Observable<FetchResult<StatPayment>> {
        const {
            partyID,
            fromTime,
            toTime,
            invoiceID,
            shopID,
            shopIDs,
            payerEmail,
            terminalID,
            providerID,
            rrn,
            paymentMethod,
            paymentSystem,
            tokenProvider,
            bin,
            pan,
            domainRevisionFrom,
            domainRevisionTo,
            paymentAmountFrom,
            paymentAmountTo,
            paymentStatus,
        } = params;
        return this.merchantStatisticsService
            .getPayments({
                dsl: JSON.stringify({
                    query: {
                        payments: {
                            from_time: moment(fromTime).utc().format(),
                            to_time: moment(toTime).utc().format(),
                            size: SEARCH_LIMIT.toString(),
                            ...(partyID ? { merchant_id: partyID } : {}),
                            ...(shopID ? { shop_id: shopID } : {}),
                            ...(shopIDs?.length ? { shop_ids: shopIDs } : {}),
                            ...(domainRevisionFrom
                                ? { from_payment_domain_revision: domainRevisionFrom }
                                : {}),
                            ...(domainRevisionTo
                                ? { to_payment_domain_revision: domainRevisionTo }
                                : {}),
                            ...(paymentAmountFrom
                                ? { payment_amount_from: paymentAmountFrom }
                                : {}),
                            ...(paymentAmountTo ? { payment_amount_to: paymentAmountTo } : {}),
                            ...(providerID ? { payment_provider_id: providerID } : {}),
                            ...(terminalID ? { payment_terminal_id: terminalID } : {}),
                            ...(paymentStatus ? { payment_status: paymentStatus } : {}),
                            ...(invoiceID ? { invoice_id: invoiceID } : {}),
                            ...(payerEmail ? { payment_email: payerEmail } : {}),
                            ...(rrn ? { payment_rrn: rrn } : {}),
                            ...(paymentSystem ? { payment_system: paymentSystem } : {}),
                            ...(paymentMethod ? { payment_method: paymentMethod } : {}),
                            ...(tokenProvider ? { payment_token_provider: tokenProvider } : {}),
                            ...(bin ? { payment_first6: bin } : {}),
                            ...(pan ? { payment_last4: pan } : {}),
                        },
                    },
                } as QueryDSL),
                ...(continuationToken ? { continuation_token: continuationToken } : {}),
            })
            .pipe(
                map(({ data, continuation_token }) => ({
                    result: data.payments,
                    continuationToken: continuation_token,
                }))
            );
    }
}
