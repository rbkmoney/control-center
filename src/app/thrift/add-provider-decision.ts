import { ProviderObject } from '../damsel/domain';
import { Commit } from '../gen-damsel/domain_config';

export class AddProviderDecision {
    partyId: string;
    shopId: string;
    terminalId: string;
}

export const addProviderDecision = (
    providerObjects: ProviderObject[],
    params: AddProviderDecision
): Commit => {
    return null;
};
