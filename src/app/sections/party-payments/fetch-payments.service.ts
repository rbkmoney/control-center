import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchResult, PartialFetcher } from '@rbkmoney/partial-fetcher';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { booleanDelay } from '../../custom-operators';
import { QueryDSL } from '../../query-dsl';
import { StatPayment } from '../../thrift-services/damsel/gen-model/merch_stat';
import { MerchantStatisticsService } from '../../thrift-services/damsel/merchant-statistics.service';
import { SearchFiltersParams } from './payments-search-filters/search-filters-params';

const SEARCH_LIMIT = 10;

@Injectable()
export class FetchPaymentsService extends PartialFetcher<StatPayment, SearchFiltersParams> {
    private partyID$ = this.route.params.pipe(pluck('partyID'), shareReplay(1));

    isLoading$ = this.doAction$.pipe(booleanDelay(), shareReplay(1));

    constructor(
        private merchantStatisticsService: MerchantStatisticsService,
        private route: ActivatedRoute
    ) {
        super();
    }

    protected fetch(
        params: SearchFiltersParams,
        continuationToken: string
    ): Observable<FetchResult<StatPayment>> {
        const {
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
            fromRevision,
            toRevision,
            paymentStatus,
        } = params;
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.merchantStatisticsService
                    .getPayments({
                        dsl: JSON.stringify({
                            query: {
                                payments: {
                                    from_time: moment(fromTime).utc().format(),
                                    to_time: moment(toTime).utc().format(),
                                    size: SEARCH_LIMIT.toString(),
                                    ...(partyID ? { merchant_id: partyID } : {}),
                                    ...(shopID ? { shop_id: shopID } : {}),
                                    ...(shopIDs ? { shop_ids: shopIDs } : {}),
                                    ...(fromRevision
                                        ? { from_payment_domain_revision: fromRevision }
                                        : {}),
                                    ...(toRevision
                                        ? { to_payment_domain_revision: toRevision }
                                        : {}),
                                    ...(providerID ? { payment_provider_id: providerID } : {}),
                                    ...(terminalID ? { payment_terminal_id: terminalID } : {}),
                                    ...(paymentStatus ? { payment_status: paymentStatus } : {}),
                                    ...(invoiceID ? { invoice_id: invoiceID } : {}),
                                    ...(payerEmail ? { payment_email: payerEmail } : {}),
                                    ...(rrn ? { payment_rrn: rrn } : {}),
                                    ...(paymentSystem ? { payment_system: paymentSystem } : {}),
                                    ...(paymentMethod ? { payment_method: paymentMethod } : {}),
                                    ...(tokenProvider
                                        ? { payment_token_provider: tokenProvider }
                                        : {}),
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
                    )
            )
        );
    }
}
