import { ProviderObject } from '../../damsel/domain';
import { Commit } from '../../gen-damsel/domain_config';
import { toGenCommit } from '../converters';
import { createAddTerminalToProviderOperation } from './create-add-terminal-to-provider-operation';

export class AddDecisionToProvider {
    partyID: string;
    shopID: string;
    terminalID: number;
    providerID: number;
}

export const addDecisionToProvider = (
    providerObjects: ProviderObject[],
    params: AddDecisionToProvider
): Commit => {
    const providerObject = providerObjects.find(obj => obj.ref.id === params.providerID);
    const updateProvider = {
        update: createAddTerminalToProviderOperation(providerObject, params)
    };
    const commit = {
        ops: [updateProvider]
    };
    return toGenCommit(commit);
};
