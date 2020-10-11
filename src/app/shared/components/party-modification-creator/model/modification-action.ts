import { ContractModificationName } from './contract-modification-name';
import { ContractorModificationName } from './contractor-modification-name';
import { ShopModificationName } from './shop-modification-name';

export enum ActionType {
    contractAction = 'contractAction',
    shopAction = 'shopAction',
    contractorAction = 'contractorAction',
}

export interface ModificationAction {
    type: ActionType;
    name?: ContractModificationName | ShopModificationName | ContractorModificationName;
}
