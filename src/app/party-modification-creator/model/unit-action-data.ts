import { Modification } from '../../thrift-services/damsel/gen-model/claim_management';

export interface UnitActionData {
    type: 'allActions' | 'contractActions' | 'shopActions' | 'contractorActions';
    partyID: string;
    unitID?: string;
    unsaved: Modification[];
}
