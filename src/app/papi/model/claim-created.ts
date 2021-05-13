import { ClaimStatus } from './claim-status';

export class ClaimCreated {
    claimId: number;
    claimStatus: ClaimStatus;
    createdAt: string;
    revision: string;
}
