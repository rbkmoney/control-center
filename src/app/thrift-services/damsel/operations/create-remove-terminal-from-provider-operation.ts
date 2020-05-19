import { toGenDomainObject } from '../../converters';
import { ProviderObject } from '../gen-model/domain';
import { UpdateOp } from '../gen-model/domain_config';
import { removeTerminalDecision } from './remove-terminal-decision';
import { RemoveTerminalFromShopParams } from './remove-terminal-from-shop-params';

export const createRemoveTerminalFromProviderOperation = (
    providerObject: ProviderObject,
    params: RemoveTerminalFromShopParams
): UpdateOp => ({
    old_object: toGenDomainObject(providerObject, 'provider'),
    new_object: toGenDomainObject(
        removeTerminalDecision(providerObject, params.partyID, params.shopID, params.terminalID),
        'provider'
    ),
});
