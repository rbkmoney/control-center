import { getUnionKey } from '@cc/utils/get-union-key';

import { ClaimStatus } from '../../papi/model';
import { ClaimStatus as UnionClaimStatus } from '../../thrift-services/damsel/gen-model/claim_management';

export const CLAIM_STATUS_BY_UNION_CLAIM_STATUS: {
    [name in keyof UnionClaimStatus]-?: ClaimStatus;
} = {
    accepted: ClaimStatus.Accepted,
    denied: ClaimStatus.Denied,
    revoked: ClaimStatus.Revoked,
    pending: ClaimStatus.Pending,
    review: ClaimStatus.Review,
    pending_acceptance: ClaimStatus.PendingAcceptance,
};

export const extractClaimStatus = (status: UnionClaimStatus): ClaimStatus =>
    CLAIM_STATUS_BY_UNION_CLAIM_STATUS[getUnionKey(status)];
