import { ClaimStatus } from '../../../thrift-services/damsel/gen-model/claim_management';
import { ClaimStatus as ClaimStatusEnum } from '../../../papi/model';
import { Statuses } from './statuses';
import { extractClaimStatus } from '../../../shared/extract-claim-status';

export const getAvailableClaimStatuses = (status: ClaimStatus): Statuses[] => {
    switch (extractClaimStatus(status)) {
        case ClaimStatusEnum.pending:
            return [
                Statuses.pending_acceptance,
                Statuses.review,
                Statuses.denied,
                Statuses.revoked
            ];
        case ClaimStatusEnum.review:
            return [
                Statuses.pending_acceptance,
                Statuses.pending,
                Statuses.denied,
                Statuses.revoked
            ];
        default:
            return [];
    }
};
