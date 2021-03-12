import { Moment } from 'moment';

export interface FormValue {
    fromTime: Moment;
    toTime: Moment;
    amountTo?: number;
    currencyCode?: string;
    status?: string;
    depositId?: string;
    identityId?: string;
    walletId?: string;
    partyId?: string;
}
