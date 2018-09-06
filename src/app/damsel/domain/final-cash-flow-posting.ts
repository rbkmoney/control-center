import { Cash } from './cash';
import { FinalCashFlowAccount } from './final-cash-flow-account';

export interface FinalCashFlowPosting {
    source: FinalCashFlowAccount;
    destination: FinalCashFlowAccount;
    volume: Cash;
    details?: string;
}
