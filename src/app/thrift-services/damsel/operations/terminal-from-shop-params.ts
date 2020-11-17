import { TerminalID } from '../../fistful/gen-model/fistful';
import { ProviderID } from '../../fistful/gen-model/provider';
import { PartyID, ShopID } from '../gen-model/domain';

export interface TerminalFromShopParams {
    partyID: PartyID;
    shopID: ShopID;
    terminalID: TerminalID;
    providerID: ProviderID;
}
