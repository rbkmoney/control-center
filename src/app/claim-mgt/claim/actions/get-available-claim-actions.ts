import { ClaimStatus } from '../../../thrift-services/damsel/gen-model/claim_management';
import { ClaimStatus as ClaimStatusEnum } from '../../../papi/model';
import { Actions } from './actions';
import { extractClaimStatus } from '../../../shared/extract-claim-status';

export const getAvailableClaimActions = (status: ClaimStatus): Actions[] => {
    switch (extractClaimStatus(status)) {
        case ClaimStatusEnum.pending:
            return [Actions.pending_acceptance, Actions.review, Actions.denied, Actions.revoked];
        case ClaimStatusEnum.review:
            return [Actions.pending_acceptance, Actions.pending, Actions.denied, Actions.revoked];
        default:
            return [];
    }
};