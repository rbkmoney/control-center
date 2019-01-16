import { PayoutToolID } from './payout-tool-id';
import { CurrencyRef } from './currency-ref';
import { PayoutToolInfo } from './payout-tool-info';

export class PayoutTool {
    id: PayoutToolID;
    createdAt: string;
    currency: CurrencyRef;
    payoutToolInfo: PayoutToolInfo;
}
