import { Predicate } from './predicate';
import { ContractTemplateSelector } from './contract-template-selector';

export class ContractTemplateDecision {
    if_: Predicate;
    then_: ContractTemplateSelector;
}
