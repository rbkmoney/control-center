import { ClaimStatus } from '../../../thrift-services/damsel/gen-model/claim_management';
import { ClaimStatus as ClaimStatusEnum } from '../../../papi/model';
import { ClaimStatuses } from '../claim-statuses';
import { extractClaimStatus } from '../../../shared/extract-claim-status';

export const getAvailableClaimStatuses = (status: ClaimStatus): ClaimStatuses[] => {
    switch (extractClaimStatus(status)) {
        case ClaimStatusEnum.pending:
            return [
                ClaimStatuses.pending_acceptance,
                ClaimStatuses.review,
                ClaimStatuses.denied,
                ClaimStatuses.revoked
            ];
        case ClaimStatusEnum.review:
            return [
                ClaimStatuses.pending_acceptance,
                ClaimStatuses.pending,
                ClaimStatuses.denied,
                ClaimStatuses.revoked
            ];
        default:
            return [];
    }
};
