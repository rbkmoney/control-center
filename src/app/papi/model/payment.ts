export class Payment {
    id: string;
    invoiceId: string;
    ownerId: string;
    shopId: string;
    createdAt: string;
    status: any;
    amount: number;
    fee: number;
    providerFee: number;
    externalFee: number;
    currencySymbolicCode: string;
    payer: any;
    ipAddress: string;
    fingerprint: string;
    email: string;
    sessionId: string;
    locationInfo: any;
    flow: any;
}
