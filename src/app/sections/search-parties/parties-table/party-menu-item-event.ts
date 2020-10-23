import { PartyID } from '../../../thrift-services/damsel/gen-model/domain';
import { PartyActions } from './party-actions';

export interface PartyMenuItemEvent {
    action: PartyActions;
    partyID: PartyID;
}
