import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { map, pluck, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { PartyService } from '../../papi/party.service';
import { createDSL } from '../../query-dsl';
import { MerchantStatisticsService } from '../../thrift-services/damsel/merchant-statistics.service';
import { PaymentProcessingService } from '../../thrift-services/damsel/payment-processing.service';

@Injectable()
export class ChargebackDetailsService {
    private loadChargeback$ = new Subject<void>();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    payment$ = this.route.params.pipe(
        switchMap(({ partyID, invoiceID, paymentID }) =>
            this.merchantStatisticsService
                .getPayments({
                    dsl: createDSL({
                        payments: {
                            ...(paymentID ? { payment_id: paymentID } : {}),
                            ...(partyID ? { merchant_id: partyID } : {}),
                            ...(invoiceID ? { invoice_id: invoiceID } : {}),
                        },
                    }),
                })
                .pipe(map(({ data }) => data.payments[0]))
        ),
        shareReplay(1)
    );

    // eslint-disable-next-line @typescript-eslint/member-ordering
    shop$ = combineLatest([
        this.route.params.pipe(pluck('partyID')),
        this.payment$.pipe(pluck('shop_id')),
    ]).pipe(
        switchMap(([partyID, shopID]) => this.partyService.getShop(partyID, shopID)),
        shareReplay(1)
    );

    // eslint-disable-next-line @typescript-eslint/member-ordering
    chargeback$ = this.loadChargeback$.pipe(
        startWith(null),
        switchMap(() => this.route.params),
        switchMap((p) =>
            this.paymentProcessingService.getChargeback(p.invoiceID, p.paymentID, p.chargebackID)
        ),
        shareReplay(1)
    );

    constructor(
        private partyService: PartyService,
        private merchantStatisticsService: MerchantStatisticsService,
        private route: ActivatedRoute,
        private paymentProcessingService: PaymentProcessingService
    ) {}

    loadChargeback() {
        this.loadChargeback$.next();
    }
}
