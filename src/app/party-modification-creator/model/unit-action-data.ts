export interface UnitActionData {
    type: 'allActions' | 'contractActions' | 'shopActions';
    partyID: string;
    unitID?: string;
}
