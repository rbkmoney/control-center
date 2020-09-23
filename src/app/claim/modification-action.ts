import {
    ContractModificationName,
    ContractorModificationName,
    ShopModificationName,
} from '../party-modification-creator-legacy';

export enum ActionType {
    contractAction = 'contractAction',
    shopAction = 'shopAction',
    contractorAction = 'contractorAction',
}

export interface ModificationAction {
    type: ActionType;
    name?: ContractModificationName | ShopModificationName | ContractorModificationName;
}
