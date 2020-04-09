import { ClaimStatus } from '../../../papi/model';
import * as domain from '../../../thrift-services/damsel/gen-model/domain';

export interface SearchFormValue {
    party_id?: domain.PartyID;
    statuses?: ClaimStatus[];
}
