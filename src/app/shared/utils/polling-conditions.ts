import { depositStatus } from '../../deposits/deposit-status';
import { StatDeposit } from '../../thrift-services/fistful/gen-model/fistful_stat';

export const createDepositStopPollingCondition = (deposit: StatDeposit): boolean =>
    !!deposit && depositStatus(deposit.status) !== 'pending';
