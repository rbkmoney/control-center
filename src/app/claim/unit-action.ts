import { ContractModificationName, ShopModificationName } from './model/index';

export enum ActionType {
    contractAction = 'contractAction',
    shopAction = 'shopAction',
    domainAction = 'domainAction'
}

export interface UnitAction {
    type: ActionType;
    name?: ContractModificationName | ShopModificationName;
}
