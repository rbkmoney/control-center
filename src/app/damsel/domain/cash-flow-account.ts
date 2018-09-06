import { MerchantCashFlowAccount } from './merchant-cash-flow-account';
import { ProviderCashFlowAccount } from './provider-cash-flow-account';
import { SystemCashFlowAccount } from './system-cash-flow-account';
import { ExternalCashFlowAccount } from './external-cash-flow-account';

export interface CashFlowAccount {
    merchant?: MerchantCashFlowAccount;
    provider?: ProviderCashFlowAccount;
    system?: SystemCashFlowAccount;
    external?: ExternalCashFlowAccount;
}
