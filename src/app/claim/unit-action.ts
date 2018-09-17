import { CreatableModificationName } from '../party-modification-creation';
import { ContractModificationName, ShopModificationName } from './model';

export enum ActionType {
    contractAction = 'contractAction',
    shopAction = 'shopAction',
    domainAction = 'domainAction'
}

export interface UnitAction {
    type: ActionType;
    name?: ContractModificationName | ShopModificationName;
    modificationName?: CreatableModificationName;
}
