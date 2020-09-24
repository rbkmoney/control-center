import { extractClaimStatus } from '../../../../shared/extract-claim-status';
import { ClaimStatus as CMClaimStatus } from '../../../../thrift-services/damsel/gen-model/claim_management';
import { ClaimStatus } from './claim-status';

export const getAvailableClaimStatuses = (status: CMClaimStatus): ClaimStatus[] => {
    switch (extractClaimStatus(status)) {
        case ClaimStatus.pending:
            return [
                ClaimStatus.accepted,
                ClaimStatus.review,
                ClaimStatus.denied,
                ClaimStatus.revoked,
            ];
        case ClaimStatus.review:
            return [
                ClaimStatus.accepted,
                ClaimStatus.pending,
                ClaimStatus.denied,
                ClaimStatus.revoked,
            ];
        default:
            return [];
    }
};
