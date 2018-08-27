import { PayoutStatus } from '../model';

export class PayoutSearchParams {
    fromTime?: string;
    toTime?: string;
    status?: PayoutStatus;
    payoutIds?: string[];
    fromId?: number;
    size?: string;
}
