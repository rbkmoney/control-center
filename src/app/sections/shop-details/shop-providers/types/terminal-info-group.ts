import Int64 from 'thrift-ts/lib/int64';

import { TerminalID } from '../../../../thrift-services/fistful/gen-model/fistful';
import { PredicateType } from '../services/fetch-shop-providers/extract-terminal-infos';

export interface TerminalInfoGroup {
    terminalIds: TerminalID[];
    weights: Int64[];
    priorities: Int64[];
    disabled: boolean;
    predicateType: PredicateType;
}
