export enum TableType {
    PartyTable = 'PartyTable',
    GlobalTable = 'GlobalTable',
}

export interface PaymentsTableType {
    type: TableType;
    partyID?: string;
}
