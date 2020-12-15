import { toGenCommit } from '../../converters';
import { TerminalID } from '../../fistful/gen-model/fistful';
import { PartyID, ProviderObject, ShopID } from '../gen-model/domain';
import { Commit } from '../gen-model/domain_config';
import { createAddTerminalToProviderOperation } from './create-add-terminal-to-provider-operation';

export class AddDecisionToProvider {
    partyID: PartyID;
    shopID: ShopID;
    terminalID: TerminalID;
    providerID: number;
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
