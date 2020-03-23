import * as domain from '../../../thrift-services/damsel/gen-model/domain';
import * as claimManagement from '../../../thrift-services/damsel/gen-model/claim_management';

export interface SearchFormValue {
    party_id?: domain.PartyID;
    claim_id?: claimManagement.ClaimID;
    statuses?: string[];
}
