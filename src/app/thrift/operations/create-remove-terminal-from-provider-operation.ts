import { ProviderObject } from '../../gen-damsel/domain';
import { UpdateOp } from '../../gen-damsel/domain_config';
import { toGenDomainObject } from '../converters';
import { RemoveTerminalFromShopParams } from './remove-terminal-from-shop-params';
import { removeTerminalDecision } from './remove-terminal-decision';

export const createRemoveTerminalFromProviderOperation = (
    providerObject: ProviderObject,
    params: RemoveTerminalFromShopParams
): UpdateOp => ({
    old_object: toGenDomainObject(providerObject, 'provider'),
    new_object: toGenDomainObject(
        removeTerminalDecision(providerObject, params.partyID, params.shopID, params.terminalID),
        'provider'
    )
});