import cloneDeep from 'lodash-es/cloneDeep';

import { createDamselInstance } from '../create-damsel-instance';
import { PaymentRoutingDelegate, PaymentRoutingRulesObject } from '../gen-model/domain';
import { Commit } from '../gen-model/domain_config';
import { generateID } from '../operations/utils';

const createPartyDelegate = ({
    id,
    partyID,
    description,
}: {
    id: number;
    partyID: string;
    description?: string;
}) =>
    createDamselInstance<PaymentRoutingDelegate>('domain', 'PaymentRoutingDelegate', {
        ruleset: { id },
        description,
        allowed: {
            condition: {
                party: {
                    id: partyID,
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
                delegates: [],
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

export function addPartyDelegateCommit({
    mainRuleset,
    paymentRoutingRulesObjects,
    partyID,
    name,
    description,
    delegateDescription,
}: {
    mainRuleset: PaymentRoutingRulesObject;
    paymentRoutingRulesObjects: PaymentRoutingRulesObject[];
    partyID: string;
    name: string;
    description?: string;
    delegateDescription?: string;
}) {
    const id = generateID(paymentRoutingRulesObjects);
    const ruleset = createRuleset({ id, name, description });
    const partyDelegate = createPartyDelegate({ id, partyID, description: delegateDescription });
    const delegateRuleset = addDelegateToRuleset(mainRuleset, partyDelegate);
    return createDamselInstance<Commit>('domain_config', 'Commit', {
        ops: [
            {
                insert: {
                    object: { payment_routing_rules: ruleset },
                },
            },
            {
                update: {
                    old_object: { payment_routing_rules: mainRuleset },
                    new_object: { payment_routing_rules: delegateRuleset },
                },
            },
        ],
    });
}
