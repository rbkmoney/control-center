export enum SearchType {
    PartySearcher = 'PartySearcher',
    GlobalSearcher = 'GlobalSearcher',
}

export interface SearcherType {
    type: SearchType;
    partyID?: string;
}
