import {
    ContractModificationName,
    ContractorModificationName,
    ShopModificationName,
} from '../party-modification-creator-legacy';

export enum ActionType {
    ContractAction = 'contractAction',
    ShopAction = 'shopAction',
    ContractorAction = 'contractorAction',
}

export interface ModificationAction {
    type: ActionType;
    name?: ContractModificationName | ShopModificationName | ContractorModificationName;
}
