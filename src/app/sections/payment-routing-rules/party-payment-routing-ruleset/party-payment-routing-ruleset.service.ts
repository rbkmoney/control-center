import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { PartyService } from '../../../papi/party.service';
import { PaymentRoutingRulesService as PaymentRoutingRulesDamselService } from '../../../thrift-services';

@Injectable()
export class PartyPaymentRoutingRulesetService {
    partyID$ = this.route.params.pipe(pluck('partyID'), shareReplay(1));

    private party$ = this.partyID$.pipe(
        switchMap((partyID) => this.partyService.getParty(partyID)),
        shareReplay(1)
    );

    shops$ = this.party$.pipe(
        pluck('shops'),
        map((shops) => Array.from(shops.values()))
    );

    partyDelegate$ = this.partyID$.pipe(
        switchMap((partyID) => this.paymentRoutingRulesService.getPartyDelegate(partyID)),
        shareReplay(1)
    );

    partyRuleset$ = this.partyID$.pipe(
        switchMap((partyID) => this.paymentRoutingRulesService.getPartyRuleset(partyID)),
        shareReplay(1)
    );

    constructor(
        private paymentRoutingRulesService: PaymentRoutingRulesDamselService,
        private route: ActivatedRoute,
        private partyService: PartyService
    ) {}
}
