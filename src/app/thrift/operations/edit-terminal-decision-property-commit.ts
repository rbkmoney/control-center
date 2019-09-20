import { ProviderObject } from '../../gen-damsel/domain';
import { Commit } from '../../gen-damsel/domain_config';
import { toGenCommit } from '../converters';
import { editTerminalDecisionPropertyOperation } from './edit-terminal-decision-operations';
import { EditTerminalDecisionPropertyParams } from './edit-terminal-decision-property-params';

export const editTerminalDecisionPropertyCommit = (
    providerObject: ProviderObject,
    params: EditTerminalDecisionPropertyParams
): Commit => {
    const updateProvider = {
        update: editTerminalDecisionPropertyOperation(providerObject, params)
    };
    const commit = {
        ops: [updateProvider]
    };
    return toGenCommit(commit);
};
