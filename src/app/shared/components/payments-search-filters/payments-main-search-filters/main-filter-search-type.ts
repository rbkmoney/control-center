import { PartyID } from '../../../../thrift-services/damsel/gen-model/domain';

export enum MainSearchType {
    PartySearchFilter = 'PartySearchFilter',
    GlobalSearchFilter = 'GlobalSearchFilter',
}

export interface MainFilterSearchType {
    type: MainSearchType;
    partyID?: PartyID;
}
