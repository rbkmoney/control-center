import { TerminalObject } from '../gen-model/domain';
import { CreateTerminalParams } from './create-terminal-params';
import { generateID, toMap } from './utils';

const convert = (id: number, params: CreateTerminalParams): TerminalObject => ({
    ref: {
        id,
    },
    data: {
        name: params.terminalName,
        description: params.terminalDescription,
        risk_coverage: params.riskCoverage,
        options: toMap(params.options),
    },
});

export interface CreateTerminalObject {
    id: number;
    terminalObject: TerminalObject;
}

export const createTerminalObject = (
    terminalObjects: TerminalObject[],
    params: CreateTerminalParams
): CreateTerminalObject => {
    const id = generateID(terminalObjects);
    return { terminalObject: convert(id, params), id };
};
