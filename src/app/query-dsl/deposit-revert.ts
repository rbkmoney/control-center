import { Status } from '../thrift-services/fistful/gen-model/deposit_revert_status';
import { DepositStatus } from '../thrift-services/fistful/gen-model/fistful_stat';

export interface DepositRevertParams {
    party_id?: string;
    identity_id?: string;
    source_id?: string;
    wallet_id?: string;
    deposit_id?: string;
    revert_id?: string;
    amount_from?: number;
    amount_to?: number;
    currency_code?: string;
    status?: Status;
    deposit_status?: DepositStatus;
    from_time?: string;
    to_time?: string;
    size?: string;
}
