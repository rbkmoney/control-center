import { CreatableModificationName } from '../party-modification-creation';

export enum ActionType {
    contractAction = 'contractAction',
    shopAction = 'shopAction',
    domainAction = 'domainAction'
}

export interface UnitAction {
    type: ActionType;
    name?: CreatableModificationName;
}
