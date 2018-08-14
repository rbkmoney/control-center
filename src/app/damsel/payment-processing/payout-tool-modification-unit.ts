import { PayoutToolID } from '../domain/payout-tool-id';
import { PayoutToolModification } from './payout-tool-modification';

export class PayoutToolModificationUnit {
    payoutToolId: PayoutToolID;
    modification: PayoutToolModification;
}
