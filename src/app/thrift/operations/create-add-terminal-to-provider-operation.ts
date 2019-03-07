import { toGenDomainObject } from '../converters';
import { addTerminalDecision } from './add-terminal-decision';
import { ProviderObject } from '../../gen-damsel/domain';
import { AddDecisionToProvider } from './add-decision-to-provider-commit';
import { UpdateOp } from '../../gen-damsel/domain_config';

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
