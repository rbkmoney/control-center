import { StatDeposit } from '../thrift-services/fistful/gen-model/fistful_stat';
import { depositStatus } from '../deposits/deposit-status';

export const createDepositStopPollingCondition = (deposit: StatDeposit): boolean =>
    !!deposit && depositStatus(deposit.status) !== 'pending';
