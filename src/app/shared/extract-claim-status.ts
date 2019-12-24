import { ClaimStatus as UnionClaimStatus } from '../gen-damsel/claim_management';
import { ClaimStatus } from '../papi/model/claim-statuses';

export const claimStatusByUnionClaimStatus: { [name in keyof UnionClaimStatus]-?: ClaimStatus } = {
    accepted: ClaimStatus.accepted,
    denied: ClaimStatus.denied,
    revoked: ClaimStatus.revoked,
    pending: ClaimStatus.pending,
    review: ClaimStatus.review,
    pending_acceptance: ClaimStatus.pending_acceptance
};

export const extractClaimStatus = (status: UnionClaimStatus): ClaimStatus =>
    claimStatusByUnionClaimStatus[Object.keys(status)[0] as keyof UnionClaimStatus];
