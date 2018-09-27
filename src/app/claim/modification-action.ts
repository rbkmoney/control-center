import { ContractModificationName, ShopModificationName } from './model';

export enum ActionType {
    contractAction = 'contractAction',
    shopAction = 'shopAction',
    domainAction = 'domainAction'
}

export interface ModificationAction {
    type: ActionType;
    name?: ContractModificationName | ShopModificationName;
}
