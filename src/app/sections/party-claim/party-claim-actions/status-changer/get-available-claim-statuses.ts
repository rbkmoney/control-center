import { ClaimStatus } from '../../../../papi/model';
import { extractClaimStatus } from '../../../../shared/utils';
import { ClaimStatus as CMClaimStatus } from '../../../../thrift-services/damsel/gen-model/claim_management';

export const getAvailableClaimStatuses = (status: CMClaimStatus): ClaimStatus[] => {
    switch (extractClaimStatus(status)) {
        case ClaimStatus.Pending:
            return [
                ClaimStatus.Accepted,
                ClaimStatus.Review,
                ClaimStatus.Denied,
                ClaimStatus.Revoked,
            ];
        case ClaimStatus.Review:
            return [
                ClaimStatus.Accepted,
                ClaimStatus.Pending,
                ClaimStatus.Denied,
                ClaimStatus.Revoked,
            ];
        default:
            return [];
    }
};
