import { ClaimStatus } from '../../../papi/model';
import { ClaimID } from '../../../thrift-services/damsel/gen-model/claim_management';
import { Party } from '../../../thrift-services/deanonimus/gen-model/deanonimus';

export interface ClaimSearchForm {
    claim_id?: ClaimID;
    statuses?: ClaimStatus[];
    merchant?: Party;
}
