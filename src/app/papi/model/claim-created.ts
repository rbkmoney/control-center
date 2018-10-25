import { ClaimStatus } from './claim-statuses';

export class ClaimCreated {
    claimId: number;
    claimStatus: ClaimStatus;
    createdAt: string;
    revision: string;
}
