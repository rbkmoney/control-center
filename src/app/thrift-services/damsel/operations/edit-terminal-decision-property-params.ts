import { Int64 } from 'thrift-ts/lib';

import { ProviderID } from '../../fistful/gen-model/provider';

export class EditTerminalDecisionPropertyParams {
    providerID: ProviderID;
    terminalID: number;
    partyID: string;
    shopID: string;
    property: 'weight' | 'priority';
    value: number | Int64;
}
