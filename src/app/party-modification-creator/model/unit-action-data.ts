import { Modification } from '../../thrift-services/damsel/gen-model/claim_management';

export enum UnitActionType {
    allActions = 'allActions',
    contractActions = 'contractActions',
    shopActions = 'shopActions',
    contractorActions = 'contractorActions',
}

export interface UnitActionData {
    type: UnitActionType;
    partyID: string;
    unitID?: string;
    unsaved: Modification[];
}
