import cloneDeep from 'lodash-es/cloneDeep';

import { createDamselInstance } from '../create-damsel-instance';
import { PaymentRoutingDelegate, PaymentRoutingRulesObject } from '../gen-model/domain';
import { Commit } from '../gen-model/domain_config';
import { generateID } from '../operations/utils';

const createShopDelegate = ({
    id,
    partyID,
    shopID,
}: {
    id: number;
    partyID: string;
    shopID: string;
}) =>
    createDamselInstance<PaymentRoutingDelegate>('domain', 'PaymentRoutingDelegate', {
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

const createRuleset = ({
    id,
    name,
    description,
}: {
    id: number;
    name: string;
    description?: string;
}): PaymentRoutingRulesObject =>
    createDamselInstance<PaymentRoutingRulesObject>('domain', 'PaymentRoutingRulesObject', {
        ref: { id },
        data: {
            name,
            description,
            decisions: {
                candidates: [],
            },
        },
    });

const addDelegateToRuleset = (
    ruleset: PaymentRoutingRulesObject,
    delegate: PaymentRoutingDelegate
): PaymentRoutingRulesObject => {
    const result = cloneDeep(ruleset);
    result.data.decisions.delegates.push(delegate);
    return result;
};

export function shopRulesetCommit({
    partyRuleset,
    paymentRoutingRulesObjects,
    shopID,
    partyID,
    name,
    description,
}: {
    partyRuleset: PaymentRoutingRulesObject;
    paymentRoutingRulesObjects: PaymentRoutingRulesObject[];
    shopID: string;
    partyID: string;
    name: string;
    description?: string;
}) {
    const id = generateID(paymentRoutingRulesObjects);
    const shopRuleset = createRuleset({ id, name, description });
    const shopDelegate = createShopDelegate({ id, shopID, partyID });
    const newPartyRuleset = addDelegateToRuleset(partyRuleset, shopDelegate);
    return createDamselInstance<Commit>('domain_config', 'Commit', {
        ops: [
            {
                insert: {
                    object: { payment_routing_rules: shopRuleset },
                },
            },
            {
                update: {
                    old_object: { payment_routing_rules: partyRuleset },
                    new_object: { payment_routing_rules: newPartyRuleset },
                },
            },
        ],
    });
}
