import { Modification } from '../../../../thrift-services/damsel/gen-model/claim_management';

export enum UnitActionType {
    AllActions = 'allActions',
    ContractActions = 'contractActions',
    ShopActions = 'shopActions',
    ContractorActions = 'contractorActions',
}

export interface UnitActionData {
    type: UnitActionType;
    partyID: string;
    unitID?: string;
    fromClaim: Modification[];
}
