import { ContractTemplateRef } from './contract-template-ref';
import { ContractTemplateDecision } from './contract-template-decision';

export class ContractTemplateSelector {
    decisions: ContractTemplateDecision[];
    value: ContractTemplateRef;
}
