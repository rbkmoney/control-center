import cloneDeep from 'lodash-es/cloneDeep';

import { createDamselInstance } from '../create-damsel-instance';
import { PaymentRoutingCandidate, PaymentRoutingRulesObject } from '../gen-model/domain';
import { Commit } from '../gen-model/domain_config';

const createShopRule = ({
    terminalID,
    description,
    weight,
    priority,
}: {
    terminalID: number;
    description: string;
    weight: number;
    priority: number;
}) =>
    createDamselInstance<PaymentRoutingCandidate>('domain', 'PaymentRoutingCandidate', {
        description,
        allowed: {
            constant: true,
        },
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
}: {
    terminalID: number;
    description: string;
    weight: number;
    priority: number;
    shopRuleset: PaymentRoutingRulesObject;
}) {
    const shopRule = createShopRule({ terminalID, description, weight, priority });
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
