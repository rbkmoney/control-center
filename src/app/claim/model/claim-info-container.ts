import { PartyModificationUnitContainer } from './party-modification-unit-container';

export class ClaimInfoContainer {
    status: string;
    partyId: string;
    claimId: number;
    revision: string;
    createdAt: string;
    updatedAt: string;
    reason: string;
    partyModificationUnitContainers: PartyModificationUnitContainer[];
    extractedIds: {
        shopId: string,
        contractId: string
    };
}
