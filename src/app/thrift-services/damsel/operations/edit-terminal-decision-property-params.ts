import { Int64 } from 'thrift-ts/lib';

import { TerminalID } from '../../fistful/gen-model/fistful';
import { ProviderID } from '../../fistful/gen-model/provider';
import { PartyID, ShopID } from '../gen-model/domain';

export class EditTerminalDecisionPropertyParams {
    providerID: ProviderID;
    terminalID: TerminalID;
    partyID: PartyID;
    shopID: ShopID;
    property: 'weight' | 'priority';
    value: number | Int64;
}
