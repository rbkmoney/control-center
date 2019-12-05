import { ClaimStatus as UnionClaimStatus } from '../gen-damsel/claim_management';
import { ClaimStatus } from '../papi/model/claim-statuses';

export const extractClaimStatus = (status: UnionClaimStatus): ClaimStatus => {
    if (!!status.pending) {
        return ClaimStatus.pending;
    } else if (!!status.accepted) {
        return ClaimStatus.accepted;
    } else if (!!status.denied) {
        return ClaimStatus.denied;
    } else if (!!status.pending_acceptance) {
        return ClaimStatus.pending_acceptance;
    } else if (!!status.review) {
        return ClaimStatus.review;
    } else if (!!status.revoked) {
        return ClaimStatus.revoked;
    }
};
