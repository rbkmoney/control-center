import { ClaimStatus } from '../../../papi/model';
import { ClaimID } from '../../../thrift-services/damsel/gen-model/claim_management';

export interface SearchFormValue {
    claim_id?: ClaimID;
    email?: string;
    party_id?: string;
    statuses?: ClaimStatus[];
}
