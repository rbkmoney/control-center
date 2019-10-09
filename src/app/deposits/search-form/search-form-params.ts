import { DepositStatus } from '../../fistful/gen-model/fistful_stat';

export interface SearchFormParams {
    fromTime?: string;
    toTime?: string;
    amountTo?: number;
    currencyCode?: string;
    depositId?: string;
    identityId?: string;
    partyId?: string;
    sourceId?: string;
    status?: DepositStatus;
    walletId?: string;
}
