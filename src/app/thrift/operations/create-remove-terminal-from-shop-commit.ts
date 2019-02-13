import { ProviderObject } from '../../damsel/domain';
import { RemoveTerminalFromShopParams } from './remove-terminal-from-shop-params';
import { Commit } from '../../damsel/domain-config';
import { toGenCommit } from '../converters';
import { createRemoveTerminalFromProviderOperation } from './create-remove-terminal-from-provider-operation';

export const createRemoveTerminalFromShopCommit = (providerObject: ProviderObject, params: RemoveTerminalFromShopParams): Commit => {
    const updateProvider = {
        update: createRemoveTerminalFromProviderOperation(providerObject, params)
    };
    const commit = {
        ops: [updateProvider]
    };
    return toGenCommit(commit);
};