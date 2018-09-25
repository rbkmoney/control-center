import { Predicate } from './predicate';
import { ProviderSelector } from './provider-selector';

export class ProviderDecision {
    if_: Predicate;
    then_: ProviderSelector;
}
