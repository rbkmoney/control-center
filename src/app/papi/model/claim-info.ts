import { PartyModificationUnit } from './party-modification-unit';
import { ClaimStatus } from './claim-statuses';

export class ClaimInfo {
    partyId: string;
    claimId: number;
    status: ClaimStatus;
    assignedUserId: string;
    description: string;
    reason: string;
    modifications: PartyModificationUnit;
    modificationUnit: any;
    revision: string;
    createdAt: string;
    updatedAt: string;
}
