import { TerminalObject } from '../gen-model/domain';
import { Commit } from '../gen-model/domain_config';
import { createTerminalObject } from './create-terminal-object';
import { CreateTerminalParams } from './create-terminal-params';

export interface GetCreateTerminalCommit {
    commit: Commit;
    id: number;
}

export const getCreateTerminalCommit = (
    terminalObjects: TerminalObject[],
    params: CreateTerminalParams
): GetCreateTerminalCommit => {
    const createdTerminalObject = createTerminalObject(terminalObjects, params);
    return {
        commit: {
            ops: [
                {
                    insert: {
                        object: { terminal: createdTerminalObject.terminalObject },
                    },
                },
            ],
        },
        id: createdTerminalObject.id,
    };
};
