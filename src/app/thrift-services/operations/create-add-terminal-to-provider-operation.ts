import { toGenDomainObject } from '../converters';
import { addTerminalDecision } from './add-terminal-decision';
import { AddDecisionToProvider } from './add-decision-to-provider-commit';
import { ProviderObject } from '../damsel/gen-model/domain';
import { UpdateOp } from '../damsel/gen-model/domain_config';

export const createAddTerminalToProviderOperation = (
    providerObject: ProviderObject,
    params: AddDecisionToProvider
): UpdateOp => ({
    old_object: toGenDomainObject(providerObject, 'provider'),
    new_object: toGenDomainObject(
        addTerminalDecision(providerObject, params.partyID, params.shopID, params.terminalID),
        'provider'
    )
});
