import { ContractModificationName } from './contract-modification-name';
import { ShopModificationName } from './shop-modification-name';

export enum ActionType {
    contractAction = 'contractAction',
    shopAction = 'shopAction'
}

export interface ModificationAction {
    type: ActionType;
    name?: ContractModificationName | ShopModificationName;
}
