import { toGenCommit } from '../converters';
import { createAddTerminalToProviderOperation } from './create-add-terminal-to-provider-operation';
import { ProviderObject } from '../damsel/gen-model/domain';
import { Commit } from '../damsel/gen-model/domain_config';

export class AddDecisionToProvider {
    partyID: string;
    shopID: string;
    terminalID: number;
    providerID: number;
}

export const addDecisionToProviderCommit = (
    providerObject: ProviderObject,
    params: AddDecisionToProvider
): Commit => {
    const updateProvider = {
        update: createAddTerminalToProviderOperation(providerObject, params)
    };
    const commit = {
        ops: [updateProvider]
    };
    return toGenCommit(commit);
};
