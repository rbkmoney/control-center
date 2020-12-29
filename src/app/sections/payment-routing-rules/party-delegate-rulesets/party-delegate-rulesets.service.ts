import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map, pluck, shareReplay, startWith } from 'rxjs/operators';
import { DomainCacheService } from 'src/app/thrift-services/damsel/domain-cache.service';
import {
    PaymentInstitutionObject,
    RoutingDelegate,
    RoutingRulesObject,
} from 'src/app/thrift-services/damsel/gen-model/domain';

import { RoutingRulesService } from '../../../thrift-services';

@Injectable()
export class PartyDelegateRulesetsService {
    partyID$ = this.route.params.pipe(startWith(this.route.snapshot.params), pluck('partyID'));

    partyDelegateRulesets$ = combineLatest([
        this.domainService.getObjects('payment_institution'),
        this.paymentRoutingRulesService.rulesets$,
        this.partyID$,
    ]).pipe(
        map(([institutions, rules, partyID]) => {
            const rulesetsWithInstitution = institutions
                .map(
                    (i) =>
                        [
                            rules.find(
                                (r) => r?.ref?.id === i?.data?.payment_routing_rules?.policies?.id
                            ),
                            i,
                        ] as const
                )
                .filter(([r]) => r);
            const partyDelegateRulesets = rulesetsWithInstitution
                .map(
                    ([r, i]) =>
                        [
                            r,
                            i,
                            r?.data?.decisions?.delegates
                                ?.map((d) =>
                                    d?.allowed?.condition?.party?.id === partyID ? d : undefined
                                )
                                ?.filter((d) => d),
                        ] as const
                )
                .filter(([, , d]) => d?.length)
                .reduce(
                    (acc, [r, i, d]) => {
                        acc.push(
                            ...d.map((partyDelegate) => ({
                                partyDelegate,
                                paymentInstitution: i,
                                mainRuleset: r,
                            }))
                        );
                        return acc;
                    },
                    [] as {
                        partyDelegate: RoutingDelegate;
                        paymentInstitution: PaymentInstitutionObject;
                        mainRuleset: RoutingRulesObject;
                    }[]
                );
            return partyDelegateRulesets;
        }),
        shareReplay(1)
    );

    constructor(
        private domainService: DomainCacheService,
        private route: ActivatedRoute,
        private paymentRoutingRulesService: RoutingRulesService
    ) {}
}
