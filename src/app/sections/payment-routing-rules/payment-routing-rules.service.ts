import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, pluck, shareReplay, withLatestFrom } from 'rxjs/operators';

import { PartyService } from '../../papi/party.service';
import { PaymentRoutingRulesService as PaymentRoutingRulesDamselService } from '../../thrift-services';
import { PaymentRoutingRulesObject } from '../../thrift-services/damsel/gen-model/domain';

const findPartyDelegate = (mainRuleset: PaymentRoutingRulesObject, partyID: string) =>
    mainRuleset.data.decisions.delegates.find((d) => d?.allowed?.condition?.party?.id === partyID);

@Injectable()
export class PaymentRoutingRulesService {
    partyID$ = this.route.params.pipe(pluck('partyID'), shareReplay(1));

    partyDelegate$ = this.paymentRoutingRulesService.getMainRuleset().pipe(
        withLatestFrom(this.partyID$),
        map(([mainRuleset, partyID]) => findPartyDelegate(mainRuleset, partyID)),
        shareReplay(1)
    );

    constructor(
        private paymentRoutingRulesService: PaymentRoutingRulesDamselService,
        private partyService: PartyService,
        private route: ActivatedRoute
    ) {}
}
