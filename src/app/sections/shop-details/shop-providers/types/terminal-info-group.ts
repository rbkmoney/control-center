import Int64 from 'thrift-ts/lib/int64';

import { TerminalID } from '../../../../thrift-services/fistful/gen-model/fistful';
import { PredicateType } from './predicate-type';

export interface TerminalInfoGroup {
    terminalIds: TerminalID[];
    weights: Int64[];
    priorities: Int64[];
    disabled: boolean;
    predicateType: PredicateType;
}
