import { CurrencyRef } from './currency-ref';
import { AccountID } from './account-id';

export class ShopAccount {
    currency: CurrencyRef;
    settlement: AccountID;
    guarantee: AccountID;
    payout: AccountID;
}
