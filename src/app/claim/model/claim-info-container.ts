import { PartyModificationUnit } from './party-modification-unit';

export class ClaimInfoContainer {
    status: string;
    partyId: string;
    claimId: number;
    revision: string;
    createdAt: string;
    updatedAt: string;
    reason: string;
    partyModificationUnits: PartyModificationUnit[];
    extractedIds: {
        shopId: string,
        contractId: string
    };
}
