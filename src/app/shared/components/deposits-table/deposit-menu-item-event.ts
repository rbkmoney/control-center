import { DepositID } from '../../../thrift-services/fistful/gen-model/deposit';
import { DepositActions } from './deposit-actions';

export interface DepositMenuItemEvent {
    action: DepositActions;
    depositID: DepositID;
}
