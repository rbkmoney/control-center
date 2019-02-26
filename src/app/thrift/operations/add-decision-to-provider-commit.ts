import { ProviderObject } from '../../gen-damsel/domain';
import { Commit } from '../../gen-damsel/domain_config';
import { toGenCommit } from '../converters';
import { createAddTerminalToProviderOperation } from './create-add-terminal-to-provider-operation';

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
