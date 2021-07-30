import { StatDeposit } from '../../thrift-services/fistful/gen-model/fistful_stat';
import { getDepositStatus } from './deposit-status';

export const createDepositStopPollingCondition = (deposit: StatDeposit): boolean =>
    !!deposit && getDepositStatus(deposit.status) !== 'pending';
