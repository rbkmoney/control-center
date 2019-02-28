import { ClaimStatus } from '../../papi/model/claim-statuses';
import { ClaimActionType } from '../claim-action-type';

export class ClaimInfoContainer {
    type: ClaimActionType;
    status?: ClaimStatus;
    party_id?: string;
    claim_id?: number;
    revision?: string;
    created_at?: string;
    updated_at?: string;
    reason?: string;
    extracted_ids?: {
        shop_id: string;
        contract_id: string;
    };
}
