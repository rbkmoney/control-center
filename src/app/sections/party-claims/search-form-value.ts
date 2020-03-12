import * as domain from '../../thrift-services/damsel/gen-model/domain';
import { ClaimID } from '../../thrift-services/damsel/gen-model/claim_management';
import { ClaimStatus } from '../../papi/model';

export interface SearchFormValue {
    party_id?: domain.PartyID;
    claim_id?: ClaimID;
    statuses?: ClaimStatus[];
}
