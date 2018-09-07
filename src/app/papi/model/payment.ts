export class Payment {
    public id: string;
    public invoiceId: string;
    public ownerId: string;
    public shopId: string;
    public createdAt: string;
    public status: object;
    public amount: number;
    public fee: number;
    public providerFee: number;
    public externalFee: number;
    public currencySymbolicCode: string;
    public payer: object;
    public ipAddress: string;
    public fingerprint: string;
    public email: string;
    public sessionId: string;
    public locationInfo: object;
    public flow: object;
}
