import Int64 from 'thrift-ts/lib/int64';

import { TerminalObject } from '../../../../thrift-services/damsel/gen-model/domain';
import { PredicateType } from '../services/fetch-shop-providers/extract-terminal-infos';

export interface TerminalInfo {
    terminal: TerminalObject;
    disabled: boolean;
    predicateType: PredicateType;
    weight: Int64;
    priority: Int64;
}
