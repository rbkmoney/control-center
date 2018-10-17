import { ModificationGroup } from './modification-group';

export class ClaimInfoContainer {
    status: string;
    partyId: string;
    claimId: number;
    revision: string;
    createdAt: string;
    updatedAt: string;
    reason: string;
    // partyModificationUnitContainers: ModificationGroup[];
    extractedIds: {
        shopId: string,
        contractId: string
    };
}
