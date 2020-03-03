import * as domain from '../../../../thrift-services/damsel/gen-model/domain';
import { ClaimStatus } from '../../../../papi/model/claim-statuses';

export interface SearchFormValue {
    party_id?: domain.PartyID;
    statuses?: ClaimStatus[];
}
