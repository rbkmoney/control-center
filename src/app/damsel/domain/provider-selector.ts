import { ProviderRef } from './provider-ref';
import { ProviderDecision } from './provider-decision';

export class ProviderSelector {
    decisions: ProviderDecision[];
    value: ProviderRef[];
}
