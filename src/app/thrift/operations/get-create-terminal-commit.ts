import { createTerminalObject } from './create-terminal-object';
import { NewCreateTerminalParams } from './create-terminal-params';
import { toGenCommit, toGenDomainObject } from '../converters';
import { TerminalObject, Commit } from '../../damsel';

export interface GetCreateTerminalCommit {
    commit: Commit;
    id: number;
}

export const getCreateTerminalCommit = (
    terminalObjects: TerminalObject[],
    params: NewCreateTerminalParams
): GetCreateTerminalCommit => {
    const createdTerminalObject = createTerminalObject(terminalObjects, params);
    const insertTerminal = {
        insert: {
            object: toGenDomainObject(createdTerminalObject.terminalObject, 'terminal')
        }
    };
    const commit = {
        ops: [insertTerminal]
    };
    return { commit: toGenCommit(commit), id: createdTerminalObject.id };
};
