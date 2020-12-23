import { ProviderObject } from '../gen-model/domain';
import { UpdateOp } from '../gen-model/domain_config';
import { AddDecisionToProvider } from './add-decision-to-provider-commit';
import { addTerminalDecision } from './add-terminal-decision';

export const createAddTerminalToProviderOperation = (
    providerObject: ProviderObject,
    params: AddDecisionToProvider
): UpdateOp => ({
    old_object: { provider: providerObject },
    new_object: {
        provider: addTerminalDecision(
            providerObject,
            params.partyID,
            params.shopID,
            params.terminalID
        ),
    },
});
