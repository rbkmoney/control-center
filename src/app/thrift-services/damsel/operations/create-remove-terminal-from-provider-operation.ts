import { toGenDomainObject } from '../../converters';
import { ProviderObject } from '../gen-model/domain';
import { UpdateOp } from '../gen-model/domain_config';
import { removeTerminalDecision } from './remove-terminal-decision';
import { TerminalFromShopParams } from './terminal-from-shop-params';

export const createRemoveTerminalFromProviderOperation = (
    providerObject: ProviderObject,
    params: TerminalFromShopParams
): UpdateOp => ({
    old_object: toGenDomainObject(providerObject, 'provider'),
    new_object: toGenDomainObject(
        removeTerminalDecision(providerObject, params.partyID, params.shopID, params.terminalID),
        'provider'
    ),
});
