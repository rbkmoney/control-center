import { CreateTerminalParams, NewCreateTerminalParams } from './create-terminal-params';
import { generateID, toMap } from './utils';
import { TerminalObject } from '../../damsel/domain';
import { toGenTerminalObject } from '../converters';

const convert = (
    id: number,
    params: CreateTerminalParams | NewCreateTerminalParams
): TerminalObject => ({
    ref: {
        id
    },
    data: {
        name: params.terminalName,
        description: params.terminalDescription,
        riskCoverage: params.riskCoverage,
        options: toMap(params.options)
    }
});

export interface CreateTerminalObject {
    id: number;
    terminalObject: TerminalObject;
}

export const createTerminalObject = (
    terminalObjects: TerminalObject[],
    params: CreateTerminalParams | NewCreateTerminalParams
): CreateTerminalObject => {
    const id = generateID(terminalObjects);
    return { terminalObject: toGenTerminalObject(convert(id, params)), id };
};
