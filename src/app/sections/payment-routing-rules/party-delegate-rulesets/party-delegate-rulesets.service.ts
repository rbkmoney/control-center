import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { DomainCacheService } from 'src/app/thrift-services/damsel/domain-cache.service';
import {
    PaymentInstitution,
    PaymentInstitutionObject,
    PaymentRoutingDelegate,
    PaymentRoutingRulesObject,
} from 'src/app/thrift-services/damsel/gen-model/domain';

@Injectable()
export class PartyDelegateRulesetsService {
    partyID$ = this.route.params.pipe(pluck('partyID'));

    partyDelegateRulesets$ = combineLatest([
        this.domainService.getObject('payment_institution'),
        this.domainService.getObject('payment_routing_rules'),
        this.partyID$,
    ]).pipe(
        map(([institutions, rules, partyID]) => {
            const rulesetsWithInstitution = institutions
                .map(
                    (i) =>
                        [
                            rules.find(
                                (r) => r?.ref?.id === i?.data?.payment_routing?.policies?.id
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
                        partyDelegate: PaymentRoutingDelegate;
                        paymentInstitution: PaymentInstitutionObject;
                        mainRuleset: PaymentRoutingRulesObject;
                    }[]
                );
            return partyDelegateRulesets;
        })
    );

    constructor(private domainService: DomainCacheService, private route: ActivatedRoute) {}
}
