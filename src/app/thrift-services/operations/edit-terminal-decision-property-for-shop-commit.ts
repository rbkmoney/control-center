import { toGenCommit } from '../converters';
import { editTerminalDecisionPropertyForShopOperation } from './edit-terminal-decision-operations';
import { EditTerminalDecisionPropertyParams } from './edit-terminal-decision-property-params';
import { ProviderObject } from '../damsel/gen-model/domain';
import { Commit } from '../damsel/gen-model/domain_config';

export const editTerminalDecisionPropertyForShopCommit = (
    providerObject: ProviderObject,
    params: EditTerminalDecisionPropertyParams
): Commit => {
    const updateProvider = {
        update: editTerminalDecisionPropertyForShopOperation(providerObject, params)
    };
    const commit = {
        ops: [updateProvider]
    };
    return toGenCommit(commit);
};
