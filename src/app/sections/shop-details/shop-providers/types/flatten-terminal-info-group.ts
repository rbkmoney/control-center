import Int64 from 'thrift-ts/lib/int64';

import { TerminalID } from '../../../../thrift-services/fistful/gen-model/fistful';
import { PredicateType } from '../services/fetch-shop-providers/extract-terminal-infos';

export interface FlattenTerminalInfoGroup {
    terminalId: TerminalID;
    disabled: boolean;
    predicateType: PredicateType;
    priority: Int64;
    weight: Int64;
}
