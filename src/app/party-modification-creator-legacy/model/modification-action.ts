import { ContractModificationName } from './contract-modification-name';
import { ContractorModificationName } from './contractor-modification-name';
import { ShopModificationName } from './shop-modification-name';

export enum ActionType {
    ContractAction = 'contractAction',
    ShopAction = 'shopAction',
    ContractorAction = 'contractorAction',
}

export interface ModificationAction {
    type: ActionType;
    name?: ContractModificationName | ShopModificationName | ContractorModificationName;
}
