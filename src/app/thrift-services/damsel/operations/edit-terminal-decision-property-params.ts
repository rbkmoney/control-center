import { Int64 } from 'thrift-ts/lib';

import { TerminalID } from '../../fistful/gen-model/fistful';
import { PartyID, ShopID } from '../gen-model/domain';

export class EditTerminalDecisionPropertyParams {
    providerID: number;
    terminalID: TerminalID;
    partyID: PartyID;
    shopID: ShopID;
    property: 'weight' | 'priority';
    value: number | Int64;
}
