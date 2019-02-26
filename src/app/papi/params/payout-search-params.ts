import { PayoutStatus, PayoutTypes } from '../model';

export class PayoutSearchParams {
    fromTime?: string;
    toTime?: string;
    status?: PayoutStatus;
    payoutType?: PayoutTypes;
    payoutIds?: string[];
    fromId?: number;
    size?: string;
    minAmount?: number;
    maxAmount?: number;
    currencyCode?: string;
}
