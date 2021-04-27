import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { progress } from '@rbkmoney/utils';
import { combineLatest, of } from 'rxjs';
import { map, pluck, shareReplay, switchMap, tap } from 'rxjs/operators';

import { PartyService } from '../../papi/party.service';
import { QueryDsl } from '../../query-dsl';
import { MerchantStatisticsService } from '../../thrift-services/damsel/merchant-statistics.service';

@Injectable()
export class PaymentDetailsService {
    private partyID$ = this.route.params.pipe(pluck('partyID'), shareReplay(1));

    private routeParams$ = this.route.params.pipe(shareReplay(1));

    // eslint-disable-next-line @typescript-eslint/member-ordering
    payment$ = this.routeParams$.pipe(
        switchMap(({ partyID, invoiceID, paymentID }) =>
            this.merchantStatisticsService
                .getPayments({
                    dsl: JSON.stringify({
                        query: {
                            payments: {
                                ...(paymentID ? { payment_id: paymentID } : {}),
                                ...(partyID ? { merchant_id: partyID } : {}),
                                ...(invoiceID ? { invoice_id: invoiceID } : {}),
                            },
                        },
                    } as QueryDsl),
                })
                .pipe(
                    map(({ data }) => data.payments[0]),
                    tap((payment) => {
                        if (!payment) {
                            this.snackBar.open('An error occurred when receiving payment', 'OK');
                        }
                    })
                )
        ),
        shareReplay(1)
    );

    // eslint-disable-next-line @typescript-eslint/member-ordering
    isLoading$ = progress(this.routeParams$, this.payment$).pipe(shareReplay(1));

    // eslint-disable-next-line @typescript-eslint/member-ordering
    shop$ = this.payment$.pipe(
        switchMap((payment) => combineLatest([this.partyID$, of(payment.shop_id)])),
        switchMap(([partyID, shopID]) => this.partyService.getShop(partyID, shopID)),
        shareReplay(1)
    );

    constructor(
        private partyService: PartyService,
        private merchantStatisticsService: MerchantStatisticsService,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar
    ) {}
}
