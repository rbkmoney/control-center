import { CurrencyRef } from './currency-ref';

export interface Cash {
    amount: number;
    currency: CurrencyRef;
}
