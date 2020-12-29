import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, pluck, shareReplay, switchMap, take } from 'rxjs/operators';

import { handleError } from '../../../../utils/operators/handle-error';
import { PartyService } from '../../../papi/party.service';
import { ErrorService } from '../../../shared/services/error';
import { RoutingRulesService as PaymentRoutingRulesDamselService } from '../../../thrift-services';

@Injectable()
export class ShopPaymentRoutingRulesetService {
    partyID$: Observable<string> = this.route.params.pipe(pluck('partyID'), shareReplay(1));
    partyRulesetRefID$: Observable<number> = this.route.params.pipe(
        pluck('partyRefID'),
        map((p) => +p),
        shareReplay(1)
    );
    refID$: Observable<number> = this.route.params.pipe(
        pluck('refID'),
        map((p) => +p),
        shareReplay(1)
    );
    shopRuleset$ = this.refID$.pipe(
        switchMap((refID) => this.paymentRoutingRulesService.getRuleset(refID)),
        shareReplay(1)
    );
    private party$ = this.partyID$.pipe(
        switchMap((partyID) => this.partyService.getParty(partyID)),
        shareReplay(1)
    );
    shop$ = combineLatest([this.party$, this.shopRuleset$]).pipe(
        map(([{ shops }, ruleset]) =>
            shops.get(
                ruleset?.data?.decisions?.delegates?.find(
                    (d) => d?.allowed?.condition?.party?.definition?.shop_is
                )?.allowed?.condition?.party?.definition?.shop_is
            )
        ),
        shareReplay(1)
    );

    constructor(
        private paymentRoutingRulesService: PaymentRoutingRulesDamselService,
        private route: ActivatedRoute,
        private partyService: PartyService,
        private errorService: ErrorService
    ) {}

    removeShopRule(candidateIdx: number) {
        this.refID$
            .pipe(
                take(1),
                switchMap((refID) =>
                    this.paymentRoutingRulesService.removeShopRule({
                        refID,
                        candidateIdx,
                    })
                ),
                handleError(this.errorService.error)
            )
            .subscribe();
    }
}
