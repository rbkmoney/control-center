import { Chargebacks } from './chargebacks';
import { Deposit } from './deposit';
import { DepositRevertParams } from './deposit-revert';
import { ModelParams } from './model-params';
import { Params } from './params';
import { Payment } from './payment';
import { Refund } from './refund';
import { WalletParams } from './wallet';

export type ChargebacksParams = Params & ModelParams & Chargebacks;
export type RefundsParams = Refund & ModelParams;

export interface QueryDsl {
    query: {
        payments?: Payment & Params & ModelParams;
        deposits?: Deposit & Params & ModelParams;
        chargebacks?: ChargebacksParams;
        refunds?: RefundsParams;
        wallets?: WalletParams;
        deposit_reverts?: DepositRevertParams;
    };
}
