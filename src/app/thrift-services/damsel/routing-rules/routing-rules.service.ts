import { Injectable } from '@angular/core';
import cloneDeep from 'lodash-es/cloneDeep';
import { combineLatest, Observable } from 'rxjs';
import { map, pluck, shareReplay, switchMap, take } from 'rxjs/operators';

import { createNextId } from '../../utils/create-next-id';
import { DomainCacheService } from '../domain-cache.service';
import {
    Predicate,
    RoutingCandidate,
    RoutingDelegate,
    RoutingRulesObject,
} from '../gen-model/domain';
import { Version } from '../gen-model/domain_config';
import { getDelegate } from './utils/get-delegate';

@Injectable()
export class RoutingRulesService {
    rulesets$: Observable<RoutingRulesObject[]> = this.domainService
        .getObjects('routing_rules')
        .pipe(
            map((r) => r.sort((a, b) => a.ref.id - b.ref.id)),
            shareReplay(1)
        );

    nextRefID$ = this.rulesets$.pipe(
        map((rulesets) => rulesets.map(({ ref }) => ref.id)),
        map(createNextId)
    );

    constructor(private domainService: DomainCacheService) {}

    getRuleset(refID: number): Observable<RoutingRulesObject> {
        return this.rulesets$.pipe(map((rulesets) => rulesets.find((r) => r?.ref?.id === refID)));
    }

    addPartyRuleset({
        name,
        mainRulesetRefID,
        partyID,
        description,
        delegateDescription,
    }: {
        name: string;
        mainRulesetRefID: number;
        partyID: string;
        description?: string;
        delegateDescription?: string;
    }): Observable<Version> {
        return combineLatest([this.getRuleset(mainRulesetRefID), this.nextRefID$]).pipe(
            take(1),
            switchMap(([mainRuleset, id]) => {
                const ruleset: RoutingRulesObject = {
                    ref: { id },
                    data: {
                        name,
                        description,
                        decisions: {
                            delegates: [],
                        },
                    },
                };
                const newMainRuleset = this.cloneRulesetAndPushDelegate(mainRuleset, {
                    ruleset: { id },
                    description: delegateDescription,
                    allowed: {
                        condition: {
                            party: {
                                id: partyID,
                            },
                        },
                    },
                });
                return this.domainService.commit({
                    ops: [
                        {
                            insert: {
                                object: { routing_rules: ruleset },
                            },
                        },
                        {
                            update: {
                                old_object: { routing_rules: mainRuleset },
                                new_object: { routing_rules: newMainRuleset },
                            },
                        },
                    ],
                });
            })
        );
    }

    addShopRuleset({
        name,
        shopID,
        partyID,
        partyRulesetRefID,
        description,
    }: {
        name: string;
        shopID: string;
        partyID: string;
        partyRulesetRefID: number;
        description?: string;
    }): Observable<Version> {
        return combineLatest([this.getRuleset(partyRulesetRefID), this.nextRefID$]).pipe(
            take(1),
            switchMap(([partyRuleset, id]) => {
                const shopRuleset: RoutingRulesObject = {
                    ref: { id },
                    data: {
                        name,
                        description,
                        decisions: {
                            candidates: [],
                        },
                    },
                };
                const newPartyRuleset = this.cloneRulesetAndPushDelegate(partyRuleset, {
                    ruleset: { id },
                    allowed: {
                        condition: {
                            party: {
                                id: partyID,
                                definition: {
                                    shop_is: shopID,
                                },
                            },
                        },
                    },
                });
                return this.domainService.commit({
                    ops: [
                        {
                            insert: {
                                object: { routing_rules: shopRuleset },
                            },
                        },
                        {
                            update: {
                                old_object: { routing_rules: partyRuleset },
                                new_object: { routing_rules: newPartyRuleset },
                            },
                        },
                    ],
                });
            })
        );
    }

    addShopRule({
        refID,
        terminalID,
        description,
        weight,
        priority,
        predicate,
    }: {
        refID: number;
        terminalID: number;
        description: string;
        weight: number;
        priority: number;
        predicate: Predicate;
    }): Observable<Version> {
        return this.getRuleset(refID).pipe(
            take(1),
            switchMap((shopRuleset) => {
                const newShopRule = this.cloneRulesetAndPushCandidate(shopRuleset, {
                    description,
                    allowed: predicate,
                    terminal: {
                        id: terminalID,
                    },
                    weight,
                    priority,
                });
                return this.domainService.commit({
                    ops: [
                        {
                            update: {
                                old_object: { routing_rules: shopRuleset },
                                new_object: { routing_rules: newShopRule },
                            },
                        },
                    ],
                });
            })
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
        return combineLatest([this.getRuleset(mainRulesetRefID), this.nextRefID$]).pipe(
            take(1),
            switchMap(([mainRuleset, id]) => {
                const newMainPaymentRoutingRuleset = this.cloneRulesetAndPushDelegate(mainRuleset, {
                    description: mainDelegateDescription,
                    allowed: {
                        condition: {
                            party: { id: partyID },
                        },
                    },
                    ruleset: { id },
                });
                const ruleset: RoutingRulesObject = {
                    ref: { id },
                    data: {
                        name,
                        description,
                        decisions: { delegates: [] },
                    },
                };
                return this.domainService.commit({
                    ops: [
                        {
                            insert: { object: { routing_rules: ruleset } },
                        },
                        {
                            update: {
                                old_object: { routing_rules: mainRuleset },
                                new_object: { routing_rules: newMainPaymentRoutingRuleset },
                            },
                        },
                    ],
                });
            })
        );
    }

    removeShopRule({
        refID,
        candidateIdx,
    }: {
        refID: number;
        candidateIdx: number;
    }): Observable<Version> {
        return this.getRuleset(refID).pipe(
            take(1),
            switchMap((shopRuleset) => {
                const newShopRule = cloneDeep(shopRuleset);
                newShopRule.data.decisions.candidates.splice(candidateIdx, 1);
                return this.domainService.commit({
                    ops: [
                        {
                            update: {
                                old_object: { routing_rules: shopRuleset },
                                new_object: { routing_rules: newShopRule },
                            },
                        },
                    ],
                });
            })
        );
    }

    deleteDelegate({
        mainRulesetRefID,
        delegateIdx,
    }: {
        mainRulesetRefID: number;
        delegateIdx: number;
    }): Observable<Version> {
        return this.getRuleset(mainRulesetRefID).pipe(
            take(1),
            switchMap((mainRuleset) => {
                const newMainPaymentRoutingRuleset = cloneDeep(mainRuleset);
                newMainPaymentRoutingRuleset.data.decisions.delegates.splice(delegateIdx, 1);
                return this.domainService.commit({
                    ops: [
                        {
                            update: {
                                old_object: { routing_rules: mainRuleset },
                                new_object: { routing_rules: newMainPaymentRoutingRuleset },
                            },
                        },
                    ],
                });
            })
        );
    }

    changeMainRuleset({
        previousMainRulesetRefID,
        mainRulesetRefID,
        delegateIdx,
        mainDelegateDescription,
    }: {
        previousMainRulesetRefID: number;
        mainRulesetRefID: number;
        delegateIdx: number;
        mainDelegateDescription?: string;
    }): Observable<Version> {
        return combineLatest([
            this.getRuleset(mainRulesetRefID),
            this.getRuleset(previousMainRulesetRefID),
        ]).pipe(
            take(1),
            switchMap(([mainRuleset, previousMainRuleset]) => {
                const newPreviousMainRuleset = cloneDeep(previousMainRuleset);
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
                return this.domainService.commit({
                    ops: [
                        {
                            update: {
                                old_object: { routing_rules: previousMainRuleset },
                                new_object: { routing_rules: newPreviousMainRuleset },
                            },
                        },
                        {
                            update: {
                                old_object: { routing_rules: mainRuleset },
                                new_object: { routing_rules: newMainPaymentRoutingRuleset },
                            },
                        },
                    ],
                });
            })
        );
    }

    changeDelegateRuleset({
        mainRulesetRefID,
        delegateIdx,
        newDelegateRulesetRefID,
        description,
    }: {
        mainRulesetRefID: number;
        delegateIdx: number;
        newDelegateRulesetRefID: number;
        description?: string;
    }): Observable<Version> {
        return this.getRuleset(mainRulesetRefID).pipe(
            take(1),
            switchMap((mainRuleset) => {
                const newMainRuleset = cloneDeep(mainRuleset);
                newMainRuleset.data.decisions.delegates[
                    delegateIdx
                ].ruleset.id = newDelegateRulesetRefID;
                if (description !== undefined) {
                    newMainRuleset.data.decisions.delegates[delegateIdx].description = description;
                }
                return this.domainService.commit({
                    ops: [
                        {
                            update: {
                                old_object: { routing_rules: mainRuleset },
                                new_object: { routing_rules: newMainRuleset },
                            },
                        },
                    ],
                });
            })
        );
    }

    cloneDelegateRuleset({
        mainRulesetRefID,
        delegateIdx,
    }: {
        mainRulesetRefID: number;
        delegateIdx: number;
    }): Observable<Version> {
        return combineLatest([
            this.getRuleset(mainRulesetRefID),
            this.getRuleset(mainRulesetRefID).pipe(
                switchMap((r) => this.getRuleset(getDelegate(r, delegateIdx).ruleset.id))
            ),
            this.nextRefID$,
        ]).pipe(
            take(1),
            switchMap(([mainRuleset, delegateRuleset, nextRefID]) => {
                const newMainRuleset = cloneDeep(mainRuleset);
                getDelegate(newMainRuleset, delegateIdx).ruleset.id = nextRefID;
                const newDelegateRuleset = cloneDeep(delegateRuleset);
                newDelegateRuleset.ref.id = nextRefID;
                return this.domainService.sequenseCommits([
                    {
                        ops: [
                            {
                                insert: {
                                    object: { routing_rules: newDelegateRuleset },
                                },
                            },
                        ],
                    },
                    {
                        ops: [
                            {
                                update: {
                                    old_object: { routing_rules: mainRuleset },
                                    new_object: { routing_rules: newMainRuleset },
                                },
                            },
                        ],
                    },
                ]);
            }),
            pluck('1')
        );
    }

    private cloneRulesetAndPushDelegate(ruleset: RoutingRulesObject, delegate: RoutingDelegate) {
        const newRuleset = cloneDeep(ruleset);
        if (!Array.isArray(newRuleset.data.decisions.delegates)) {
            newRuleset.data.decisions.delegates = [];
        }
        newRuleset.data.decisions.delegates.push(delegate);
        return newRuleset;
    }

    private cloneRulesetAndPushCandidate(ruleset: RoutingRulesObject, candidate: RoutingCandidate) {
        const newRuleset = cloneDeep(ruleset);
        if (!Array.isArray(newRuleset.data.decisions.candidates)) {
            newRuleset.data.decisions.candidates = [];
        }
        newRuleset.data.decisions.candidates.push(candidate);
        return newRuleset;
    }
}
