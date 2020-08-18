import cloneDeep from 'lodash-es/cloneDeep';

import { createDamselInstance } from '../create-damsel-instance';
import { PaymentRoutingRulesObject } from '../gen-model/domain';
import { Commit } from '../gen-model/domain_config';

const removeRulesetCandidate = (
    shopRuleset: PaymentRoutingRulesObject,
    candidateIdx: number
): PaymentRoutingRulesObject => {
    const result = cloneDeep(shopRuleset);
    result.data.decisions.candidates.splice(candidateIdx, 1);
    return result;
};

export function removeShopRuleCommit({
    shopRuleset,
    candidateIdx,
}: {
    shopRuleset: PaymentRoutingRulesObject;
    candidateIdx: number;
}) {
    const newShopRule = removeRulesetCandidate(shopRuleset, candidateIdx);
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
