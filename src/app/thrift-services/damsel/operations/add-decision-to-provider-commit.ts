import { toGenCommit } from '../../converters';
import { ProviderID } from '../../fistful/gen-model/provider';
import { ProviderObject } from '../gen-model/domain';
import { Commit } from '../gen-model/domain_config';
import { createAddTerminalToProviderOperation } from './create-add-terminal-to-provider-operation';

export class AddDecisionToProvider {
    partyID: string;
    shopID: string;
    terminalID: number;
    providerID: ProviderID;
}

export const addDecisionToProviderCommit = (
    providerObject: ProviderObject,
    params: AddDecisionToProvider
): Commit => {
    const updateProvider = {
        update: createAddTerminalToProviderOperation(providerObject, params),
    };
    const commit = {
        ops: [updateProvider],
    };
    return toGenCommit(commit);
};
