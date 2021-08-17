export interface DepositParams {
    fromTime: string;
    toTime: string;
    amountTo?: number;
    currencyCode?: string;
    depositId?: string;
    identityId?: string;
    partyId?: string;
    sourceId?: string;
    status?: string;
    walletId?: string;
}
