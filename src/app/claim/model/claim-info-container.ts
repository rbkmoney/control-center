import { ClaimStatus } from '../../papi/model';
import { ClaimActionType } from '../claim-action-type';

export class ClaimInfoContainer {
    type: ClaimActionType;
    status?: ClaimStatus;
    partyId?: string;
    claimId?: number;
    revision?: string;
    createdAt?: string;
    updatedAt?: string;
    reason?: string;
    extractedIds?: {
        shopId: string;
        contractId: string;
    };
}
