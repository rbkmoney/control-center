import { PayoutStatus } from '../model';

export class PayoutSearchParams {
    public fromTime?: string;
    public toTime?: string;
    public status?: PayoutStatus;
    public payoutIds?: string[] | string;
    public fromId?: string;
    public size?: string;
}
