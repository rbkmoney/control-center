import { UpdateOp } from '../../damsel/domain-config';
import { toGenDomainObject } from '../converters';
import { addTerminalDecision } from './add-terminal-decision';
import { ProviderObject } from '../../damsel/domain';
import { AddDecisionToProvider } from './add-decision-to-provider';

export const createAddTerminalToProviderOperation = (
    providerObject: ProviderObject,
    params: AddDecisionToProvider
): UpdateOp => ({
    oldObject: toGenDomainObject(providerObject, 'provider'),
    newObject: toGenDomainObject(
        addTerminalDecision(providerObject, params.partyID, params.shopID, params.terminalID),
        'provider'
    )
});
