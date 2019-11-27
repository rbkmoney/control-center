import * as domain from '../../gen-damsel/domain';
import { ClaimStatus } from '../../gen-damsel/claim_management';

export interface SearchFormValue {
    party_id: domain.PartyID;
    statuses?: ClaimStatus[];
}
