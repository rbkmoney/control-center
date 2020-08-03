export interface UnitActionData {
    type: 'allActions' | 'contractActions' | 'shopActions' | 'contractorActions';
    partyID: string;
    unitID?: string;
}
