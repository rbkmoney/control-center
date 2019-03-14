import { createTerminalObject } from './create-terminal-object';
import { CreateTerminalParams } from './create-terminal-params';
import { toGenCommit, toGenDomainObject } from '../converters';
import { TerminalObject } from '../../gen-damsel/domain';
import { Commit } from '../../gen-damsel/domain_config';

export interface GetCreateTerminalCommit {
    commit: Commit;
    id: number;
}

export const getCreateTerminalCommit = (
    terminalObjects: TerminalObject[],
    params: CreateTerminalParams
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
