import { TerminalID } from '../../../../thrift-services/fistful/gen-model/fistful';
import { TerminalActionTypes } from './terminal-action-types';

export interface TerminalAction {
    type: TerminalActionTypes;
    terminalID: TerminalID;
}
