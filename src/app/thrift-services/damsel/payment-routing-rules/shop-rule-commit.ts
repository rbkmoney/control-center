import cloneDeep from 'lodash-es/cloneDeep';

import { createDamselInstance } from '../create-damsel-instance';
import { PaymentRoutingCandidate, PaymentRoutingRulesObject, Predicate } from '../gen-model/domain';
import { Commit } from '../gen-model/domain_config';

const createShopRule = ({
    terminalID,
    description,
    weight,
    priority,
    predicate,
}: {
    terminalID: number;
    description: string;
    weight: number;
    priority: number;
    predicate: Predicate;
}) =>
    createDamselInstance<PaymentRoutingCandidate>('domain', 'PaymentRoutingCandidate', {
        description,
        allowed: predicate,
        terminal: {
            id: terminalID,
        },
        weight,
        priority,
    });

const addDelegateToRuleset = (
    ruleset: PaymentRoutingRulesObject,
    candidate: PaymentRoutingCandidate
): PaymentRoutingRulesObject => {
    const result = cloneDeep(ruleset);
    result.data.decisions.candidates.push(candidate);
    return result;
};

export function shopRuleCommit({
    terminalID,
    description,
    weight,
    priority,
    shopRuleset,
    predicate,
}: {
    terminalID: number;
    description: string;
    weight: number;
    priority: number;
    shopRuleset: PaymentRoutingRulesObject;
    predicate: Predicate;
}) {
    const shopRule = createShopRule({ terminalID, description, weight, priority, predicate });
    const newShopRule = addDelegateToRuleset(shopRuleset, shopRule);
    return createDamselInstance<Commit>('domain_config', 'Commit', {
        ops: [
            {
                update: {
                    old_object: { payment_routing_rules: shopRuleset },
                    new_object: { payment_routing_rules: newShopRule },
                },
            },
        ],
    });
}
