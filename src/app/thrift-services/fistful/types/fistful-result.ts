import {
    StatDeposit,
    StatDestination,
    StatIdentity,
    StatWallet,
    StatWithdrawal,
} from '../gen-model/fistful_stat';

export interface FistfulData {
    deposits?: StatDeposit[];
    destinations?: StatDestination[];
    identities?: StatIdentity[];
    wallets?: StatWallet[];
    withdrawals?: StatWithdrawal[];
}

export interface FistfulResult {
    continuation_token?: string;
    data?: FistfulData;
}
