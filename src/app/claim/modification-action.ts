import { ContractModificationName, ShopModificationName } from '../party-modification-creator';

export enum ActionType {
    contractAction = 'contractAction',
    shopAction = 'shopAction'
}

export interface ModificationAction {
    type: ActionType;
    name?: ContractModificationName | ShopModificationName;
}
