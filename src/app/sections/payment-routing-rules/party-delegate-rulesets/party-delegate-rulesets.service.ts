import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map, pluck, startWith, switchMap } from 'rxjs/operators';

import { RoutingRulesService } from '../../../thrift-services';
import { DomainCacheService } from '../../../thrift-services/damsel/domain-cache.service';
import {
    PaymentInstitutionObject,
    RoutingDelegate,
    RoutingRulesObject,
} from '../../../thrift-services/damsel/gen-model/domain';

@Injectable()
export class PartyDelegateRulesetsService {
    partyID$ = this.route.params.pipe(startWith(this.route.snapshot.params), pluck('partyID'));

    constructor(
        private domainService: DomainCacheService,
        private route: ActivatedRoute,
        private paymentRoutingRulesService: RoutingRulesService
    ) {}

    getDelegatesWithPaymentInstitution() {
        return combineLatest([this.getPaymentInstitutionsWithRoutingRule(), this.partyID$]).pipe(
            map(([paymentInstitutionsWithRoutingRule, partyID]) =>
                paymentInstitutionsWithRoutingRule
                    .map(({ routingRule: mainRoutingRule, paymentInstitution }) => ({
                        mainRoutingRule,
                        paymentInstitution,
                        delegates: mainRoutingRule?.data?.decisions?.delegates
                            ?.map((d) =>
                                d?.allowed?.condition?.party?.id === partyID ? d : undefined
                            )
                            ?.filter((d) => d),
                    }))
                    .filter(({ delegates }) => delegates?.length)
                    .reduce<
                        {
                            partyDelegate: RoutingDelegate;
                            paymentInstitution: PaymentInstitutionObject;
                            mainRoutingRule: RoutingRulesObject;
                        }[]
                    >(
                        (acc, { delegates, ...rest }) => [
                            ...acc,
                            ...delegates.map((partyDelegate) => ({ ...rest, partyDelegate })),
                        ],
                        []
                    )
            )
        );
    }

    private getPaymentInstitutionsWithRoutingRule() {
        return this.domainService.getObjects('payment_institution').pipe(
            switchMap((paymentInstitutions) =>
                combineLatest(
                    paymentInstitutions.map((paymentInstitution) =>
                        this.paymentRoutingRulesService
                            .getRuleset(
                                paymentInstitution?.data?.payment_routing_rules?.policies?.id
                            )
                            .pipe(
                                map((routingRule) => ({
                                    paymentInstitution,
                                    routingRule,
                                }))
                            )
                    )
                )
            )
        );
    }
}
