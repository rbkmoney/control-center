import { CurrencyRef } from '../domain/currency-ref';
import { PayoutToolInfo } from '../domain/payout-tool-info';

export class PayoutToolParams {
    currency: CurrencyRef;
    toolInfo: PayoutToolInfo;
}
