import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import { combineLatest, of } from 'rxjs';
import { map, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { PartyService } from '../../party/party.service';
import { QueryDSL } from '../../query-dsl';
import { MerchantStatisticsService } from '../../thrift-services/damsel/merchant-statistics.service';

@Injectable()
export class PaymentDetailsService {
    private partyID$ = this.route.params.pipe(pluck('partyID'), shareReplay(1));

    private routeParams$ = this.route.params.pipe(shareReplay(1));

    payment$ = this.routeParams$.pipe(
        switchMap(({ partyID, invoiceID, paymentID }) => {
            return this.merchantStatisticsService
                .getPayments({
                    dsl: JSON.stringify({
                        query: {
                            payments: {
                                ...(paymentID ? { payment_id: paymentID } : {}),
                                ...(partyID ? { merchant_id: partyID } : {}),
                                ...(invoiceID ? { invoice_id: invoiceID } : {}),
                            },
                        },
                    } as QueryDSL),
                })
                .pipe(map(({ data }) => data.payments[0]));
        }),
        shareReplay(1)
    );

    isLoading$ = progress(this.routeParams$, this.payment$).pipe(shareReplay(1));

    shop$ = this.payment$.pipe(
        switchMap((payment) => combineLatest([this.partyID$, of(payment.shop_id)])),
        switchMap(([partyID, shopID]) => this.partyService.getShop(partyID, shopID)),
        shareReplay(1)
    );

    constructor(
        private partyService: PartyService,
        private merchantStatisticsService: MerchantStatisticsService,
        private route: ActivatedRoute
    ) {}
}
