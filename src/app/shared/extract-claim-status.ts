import { ClaimStatus as UnionClaimStatus } from '../gen-damsel/claim_management';
import { ClaimStatus } from '../papi/model/claim-statuses';

export const extractClaimStatus = (status: UnionClaimStatus): ClaimStatus =>
    ClaimStatus[Object.keys(status)[0]];
