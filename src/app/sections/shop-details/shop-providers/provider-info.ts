import Int64 from 'thrift-ts/lib/int64';

import { ProviderObject, TerminalObject } from '../../../thrift-services/damsel/gen-model/domain';
import { PredicateType } from './extract-terminal-infos';

export interface TerminalInfo {
    terminal: TerminalObject;
    disabled: boolean;
    predicateType: PredicateType;
    weight: number;
    priority: Int64;
}

export interface ProviderInfo {
    provider: ProviderObject;
    terminalInfos: TerminalInfo[];
}
