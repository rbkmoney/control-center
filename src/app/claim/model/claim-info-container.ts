import { ClaimStatus } from '../../papi/model/claim-statuses';

export class ClaimInfoContainer {
    status?: ClaimStatus;
    partyId?: string;
    claimId?: number;
    revision?: string;
    createdAt?: string;
    updatedAt?: string;
    reason?: string;
    extractedIds?: {
        shopId: string,
        contractId: string
    };
}
