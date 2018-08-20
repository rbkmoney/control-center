import { PayoutStatus } from './payout-statuses';

export class Payout {
    id: string;
    amount: number;
    currencyCode: string;
    status: PayoutStatus;
    fromTime: string;
    toTime: string;
    createdAt: string;
    partyId: string;
    shopId: string;
    payoutType: string;
}
