import { ClaimStatus as ClaimStatusEnum } from '../../../papi/model';
import { extractClaimStatus } from '../../../shared/utils';
import { ClaimStatus } from '../../../thrift-services/damsel/gen-model/claim_management';
import { ClaimStatuses } from '../claim-statuses';

export const getAvailableClaimStatuses = (status: ClaimStatus): ClaimStatuses[] => {
    switch (extractClaimStatus(status)) {
        case ClaimStatusEnum.pending:
            return [
                ClaimStatuses.accepted,
                ClaimStatuses.review,
                ClaimStatuses.denied,
                ClaimStatuses.revoked,
            ];
        case ClaimStatusEnum.review:
            return [
                ClaimStatuses.accepted,
                ClaimStatuses.pending,
                ClaimStatuses.denied,
                ClaimStatuses.revoked,
            ];
        default:
            return [];
    }
};
