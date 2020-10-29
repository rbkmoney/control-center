import { Injectable } from '@angular/core';
import cloneDeep from 'lodash-es/cloneDeep';
import { combineLatest, Observable } from 'rxjs';
import { map, shareReplay, switchMap, take, tap } from 'rxjs/operators';

import { DomainCacheService } from '../domain-cache.service';
import { DomainTypedManager } from '../domain-typed-manager';
import { DomainService } from '../domain.service';
import { PaymentRoutingRulesObject, Predicate } from '../gen-model/domain';
import { Version } from '../gen-model/domain_config';
import { generateID } from '../operations/utils';
import { partyRulesetCommit } from './party-ruleset-commit';
import { removeShopRuleCommit } from './remove-shop-rule-commit';
import { shopRuleCommit } from './shop-rule-commit';
import { shopRulesetCommit } from './shop-ruleset-commit';

const sortPaymentRoutingRulesObjects = (
    objs: PaymentRoutingRulesObject[]
): PaymentRoutingRulesObject[] => objs.sort((a, b) => a.ref.id - b.ref.id);

@Injectable()
export class PaymentRoutingRulesService {
    constructor(
        private dmtService: DomainService,
        private dmtCacheService: DomainCacheService,
        private domainTypedManager: DomainTypedManager
    ) {}

    rulesets$: Observable<PaymentRoutingRulesObject[]> = this.dmtCacheService
        .getObjects('payment_routing_rules')
        .pipe(map(sortPaymentRoutingRulesObjects), shareReplay(1));

    getRuleset(refID: number): Observable<PaymentRoutingRulesObject> {
        return this.rulesets$.pipe(map((rulesets) => rulesets.find((r) => r?.ref?.id === refID)));
    }

    generateID() {
        return this.rulesets$.pipe(map((rulesets) => generateID(rulesets)));
    }

    addPartyRuleset(params: {
        name: string;
        mainRulesetRefID: number;
        partyID: string;
        description?: string;
        delegateDescription?: string;
    }): Observable<Version> {
        return combineLatest([
            this.domainTypedManager.getLastVersion(),
            this.rulesets$,
            this.getRuleset(params.mainRulesetRefID),
        ]).pipe(
            take(1),
            switchMap(([version, paymentRoutingRulesObjects, mainRuleset]) =>
                this.dmtService.commit(
                    version,
                    partyRulesetCommit({
                        mainRuleset,
                        paymentRoutingRulesObjects,
                        ...params,
                    })
                )
            ),
            tap(() => this.dmtCacheService.forceReload())
        );
    }

    addShopRuleset(params: {
        name: string;
        shopID: string;
        partyID: string;
        partyRulesetRefID: number;
        description?: string;
    }): Observable<Version> {
        return combineLatest([
            this.domainTypedManager.getLastVersion(),
            this.rulesets$,
            this.getRuleset(params.partyRulesetRefID),
        ]).pipe(
            take(1),
            switchMap(([version, paymentRoutingRulesObjects, partyRuleset]) =>
                this.dmtService.commit(
                    version,
                    shopRulesetCommit({
                        partyRuleset,
                        paymentRoutingRulesObjects,
                        ...params,
                    })
                )
            ),
            tap(() => this.dmtCacheService.forceReload())
        );
    }

    addShopRule({
        refID,
        ...params
    }: {
        refID: number;
        terminalID: number;
        description: string;
        weight: number;
        priority: number;
        predicate: Predicate;
    }): Observable<Version> {
        return combineLatest([
            this.domainTypedManager.getLastVersion(),
            this.getRuleset(refID),
        ]).pipe(
            take(1),
            switchMap(([version, shopRuleset]) =>
                this.dmtService.commit(
                    version,
                    shopRuleCommit({
                        shopRuleset,
                        ...params,
                    })
                )
            ),
            tap(() => this.dmtCacheService.forceReload())
        );
    }

    removeShopRule({
        refID,
        candidateIdx,
    }: {
        refID: number;
        candidateIdx: number;
    }): Observable<Version> {
        return combineLatest([
            this.domainTypedManager.getLastVersion(),
            this.getRuleset(refID),
        ]).pipe(
            take(1),
            switchMap(([version, shopRuleset]) =>
                this.dmtService.commit(
                    version,
                    removeShopRuleCommit({
                        shopRuleset,
                        candidateIdx,
                    })
                )
            ),
            tap(() => this.dmtCacheService.forceReload())
        );
    }

    attachPartyDelegateRuleset({
        mainRulesetRefID,
        partyID,
        mainDelegateDescription,
        ruleset: { name, description },
    }: {
        mainRulesetRefID: number;
        partyID: string;
        mainDelegateDescription?: string;
        ruleset: { name: string; description?: string };
    }): Observable<Version> {
        return combineLatest([this.getRuleset(mainRulesetRefID), this.generateID()]).pipe(
            take(1),
            switchMap(([mainRuleset, rulesetID]) => {
                const newMainPaymentRoutingRuleset = cloneDeep(mainRuleset);
                if (!newMainPaymentRoutingRuleset.data.decisions.delegates) {
                    newMainPaymentRoutingRuleset.data.decisions.delegates = [];
                }
                newMainPaymentRoutingRuleset.data.decisions.delegates.push({
                    description: mainDelegateDescription,
                    allowed: {
                        condition: {
                            party: { id: partyID },
                        },
                    },
                    ruleset: {
                        id: rulesetID,
                    },
                });
                const ruleset: PaymentRoutingRulesObject = {
                    ref: { id: rulesetID },
                    data: {
                        name,
                        description,
                        decisions: { delegates: [] },
                    },
                };
                return this.dmtCacheService.commit({
                    ops: [
                        {
                            insert: { object: { payment_routing_rules: ruleset } },
                        },
                        {
                            update: {
                                old_object: { payment_routing_rules: mainRuleset },
                                new_object: { payment_routing_rules: newMainPaymentRoutingRuleset },
                            },
                        },
                    ],
                });
            })
        );
    }

    deleteRulesetAndDelegate({
        mainRulesetRefID,
        rulesetRefID,
    }: {
        mainRulesetRefID: number;
        rulesetRefID: number;
    }): Observable<Version> {
        return combineLatest([
            this.getRuleset(mainRulesetRefID),
            this.getRuleset(rulesetRefID),
        ]).pipe(
            take(1),
            switchMap(([mainRuleset, ruleset]) => {
                const newMainPaymentRoutingRuleset = cloneDeep(mainRuleset);
                newMainPaymentRoutingRuleset.data.decisions.delegates.splice(
                    newMainPaymentRoutingRuleset.data.decisions.delegates.findIndex(
                        (d) => d.ruleset.id === rulesetRefID
                    ),
                    1
                );
                return this.dmtCacheService.commit({
                    ops: [
                        {
                            update: {
                                old_object: { payment_routing_rules: mainRuleset },
                                new_object: { payment_routing_rules: newMainPaymentRoutingRuleset },
                            },
                        },
                        {
                            remove: {
                                object: { payment_routing_rules: ruleset },
                            },
                        },
                    ],
                });
            })
        );
    }

    changePartyDelegateRuleset({
        previousMainRulesetRefID,
        mainRulesetRefID,
        rulesetID,
        mainDelegateDescription,
    }: {
        previousMainRulesetRefID: number;
        mainRulesetRefID: number;
        rulesetID: number;
        mainDelegateDescription?: string;
    }): Observable<Version> {
        return combineLatest([
            this.getRuleset(mainRulesetRefID),
            this.getRuleset(previousMainRulesetRefID),
        ]).pipe(
            take(1),
            switchMap(([mainRuleset, previousMainRuleset]) => {
                const newPreviousMainRuleset = cloneDeep(previousMainRuleset);
                const delegateIdx = newPreviousMainRuleset.data.decisions.delegates.findIndex(
                    (d) => d?.ruleset?.id === rulesetID
                );
                const [delegate] = newPreviousMainRuleset.data.decisions.delegates.splice(
                    delegateIdx,
                    1
                );

                const newMainPaymentRoutingRuleset = cloneDeep(mainRuleset);
                if (!newMainPaymentRoutingRuleset.data.decisions.delegates) {
                    newMainPaymentRoutingRuleset.data.decisions.delegates = [];
                }
                newMainPaymentRoutingRuleset.data.decisions.delegates.push({
                    ...delegate,
                    description: mainDelegateDescription,
                });
                return this.dmtCacheService.commit({
                    ops: [
                        {
                            update: {
                                old_object: { payment_routing_rules: previousMainRuleset },
                                new_object: { payment_routing_rules: newPreviousMainRuleset },
                            },
                        },
                        {
                            update: {
                                old_object: { payment_routing_rules: mainRuleset },
                                new_object: { payment_routing_rules: newMainPaymentRoutingRuleset },
                            },
                        },
                    ],
                });
            })
        );
    }
}
