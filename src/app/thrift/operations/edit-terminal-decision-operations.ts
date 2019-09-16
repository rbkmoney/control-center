import { ProviderObject } from '../../gen-damsel/domain';
import { UpdateOp } from '../../gen-damsel/domain_config';
import { toGenDomainObject } from '../converters';
import { editTerminalDecisionProperty } from './edit-terminal-decision-property';
import { EditTerminalDecisionPropertyParams } from './edit-terminal-decision-property-params';

export const editTerminalDecisionPropertyOperation = (
    providerObject: ProviderObject,
    params: EditTerminalDecisionPropertyParams
): UpdateOp => ({
    old_object: toGenDomainObject(providerObject, 'provider'),
    new_object: toGenDomainObject(editTerminalDecisionProperty(providerObject, params), 'provider')
});
