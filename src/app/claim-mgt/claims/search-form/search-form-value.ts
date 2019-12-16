import * as domain from '../../../gen-damsel/domain';
import { ClaimStatus } from '../../../papi/model/claim-statuses';

export interface SearchFormValue {
    party_id?: domain.PartyID;
    statuses?: ClaimStatus[];
}
