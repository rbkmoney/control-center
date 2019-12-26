import { DepositStatus } from '../thrift-services/fistful/gen-model/fistful_stat';

export interface Deposit {
    amount_to?: number;
    currency_code?: string;
    deposit_id?: string;
    identity_id?: string;
    party_id?: string;
    source_id?: string;
    status?: DepositStatus;
    wallet_id?: string;
}
