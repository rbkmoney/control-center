export interface SearchFiltersParams {
    partyID?: string;
    fromTime?: string;
    toTime?: string;
    invoiceID?: string;
    shopID?: string;
    shopIDs?: string[];
    payerEmail?: string;
    terminalID?: string;
    providerID?: string;
    rrn?: string;
    paymentMethod?: string;
    paymentSystem?: string;
    tokenProvider?: string;
    bin?: string;
    pan?: string;
    fromRevision?: string;
    toRevision?: string;
    paymentStatus?: string;
}
