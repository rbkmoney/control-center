import { StatDeposit } from '../fistful/gen-model/fistful_stat';
import { depositStatus } from '../deposits/deposit-status';
import { Observable, of } from 'rxjs';

export const createdDepositStopPollingCondition = (deposit: StatDeposit): Observable<boolean> =>
    of(!!deposit && depositStatus(deposit.status) !== 'pending');
