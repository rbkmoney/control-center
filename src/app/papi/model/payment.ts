export class Payment {
    id: string;
    invoiceId: string;
    ownerId: string;
    shopId: string;
    createdAt: string;
    status: object;
    amount: number;
    fee: number;
    providerFee: number;
    externalFee: number;
    currencySymbolicCode: string;
    payer: object;
    ipAddress: string;
    fingerprint: string;
    email: string;
    sessionId: string;
    locationInfo: object;
    flow: object;
}
