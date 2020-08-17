import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { PartyService } from '../../../papi/party.service';
import { PaymentRoutingRulesService as PaymentRoutingRulesDamselService } from '../../../thrift-services';

@Injectable()
export class ShopPaymentRoutingRulesetService {
    partyID$: Observable<string> = this.route.params.pipe(pluck('partyID'), shareReplay(1));
    refID$: Observable<number> = this.route.params.pipe(
        pluck('refID'),
        map((p) => parseInt(p, 10)),
        shareReplay(1)
    );
    shopDelegate$ = combineLatest([this.partyID$, this.refID$]).pipe(
        switchMap(([partyID, refID]) =>
            this.paymentRoutingRulesService.getShopDelegate(partyID, refID)
        ),
        shareReplay(1)
    );
    shopRuleset$ = combineLatest([this.partyID$, this.refID$]).pipe(
        switchMap(([partyID, refID]) =>
            this.paymentRoutingRulesService.getShopRuleset(partyID, refID)
        ),
        shareReplay(1)
    );
    private party$ = this.partyID$.pipe(
        switchMap((partyID) => this.partyService.getParty(partyID)),
        shareReplay(1)
    );
    shop$ = combineLatest([this.party$, this.shopDelegate$]).pipe(
        map(([{ shops }, shopDelegate]) =>
            shops.get(shopDelegate?.allowed?.condition?.party?.definition?.shop_is)
        ),
        shareReplay(1)
    );

    constructor(
        private paymentRoutingRulesService: PaymentRoutingRulesDamselService,
        private route: ActivatedRoute,
        private partyService: PartyService
    ) {}
}
