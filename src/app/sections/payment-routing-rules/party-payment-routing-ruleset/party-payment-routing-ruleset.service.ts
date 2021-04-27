import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map, pluck, shareReplay, switchMap } from 'rxjs/operators';
import { DomainCacheService } from 'src/app/thrift-services/damsel/domain-cache.service';

import { PartyService } from '../../../papi/party.service';

@Injectable()
export class PartyPaymentRoutingRulesetService {
    partyID$ = this.route.params.pipe(pluck('partyID'), shareReplay(1));
    refID$ = this.route.params.pipe(
        pluck('partyRefID'),
        map((r) => +r),
        shareReplay(1)
    );

    private party$ = this.partyID$.pipe(
        switchMap((partyID) => this.partyService.getParty(partyID)),
        shareReplay(1)
    );

    // eslint-disable-next-line @typescript-eslint/member-ordering
    shops$ = this.party$.pipe(
        pluck('shops'),
        map((shops) => Array.from(shops.values()))
    );

    // eslint-disable-next-line @typescript-eslint/member-ordering
    partyRuleset$ = combineLatest([
        this.domainService.getObjects('routing_rules'),
        this.refID$,
    ]).pipe(
        map(([rules, refID]) => rules.find((r) => r?.ref?.id === refID)),
        shareReplay(1)
    );

    constructor(
        private route: ActivatedRoute,
        private partyService: PartyService,
        private domainService: DomainCacheService
    ) {}
}
