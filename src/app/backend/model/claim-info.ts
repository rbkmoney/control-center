import { PartyModificationUnit } from './party-modification-unit';

export class ClaimInfo {
    partyId: string;
    claimId: number;
    status: string;
    assignedUserId: string;
    description: string;
    reason: string;
    // modificationUnit: PartyModificationUnit;
    modifications: PartyModificationUnit;
    modificationUnit: any;
    revision: string;
    createdAt: string;
    updatedAt: string;
}
