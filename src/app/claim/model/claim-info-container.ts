export class ClaimInfoContainer {
    status: string;
    partyId: string;
    claimId: number;
    revision: string;
    createdAt: string;
    updatedAt: string;
    reason: string;
    extractedIds: {
        shopId: string,
        contractId: string
    };
}
