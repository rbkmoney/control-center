import { TerminalID } from '../../fistful/gen-model/fistful';
import { PartyID, ShopID } from '../gen-model/domain';

export class RemoveTerminalFromShopParams {
    partyID: PartyID;
    shopID: ShopID;
    terminalID: TerminalID;
    providerID: number;
}
