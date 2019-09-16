import { Int64 } from 'thrift-ts/lib';

export class EditTerminalDecisionPropertyParams {
    providerID: number;
    terminalID: number;
    partyID: string;
    shopID: string;
    property: 'weight' | 'priority';
    value: number | Int64;
}
