import {
    AppendTerminalToProviderParams,
    CreateTerminalParams
} from './append-terminal-to-provider-params';
import { generateID, toMap } from './utils';
import { TerminalObject } from '../../gen-damsel/domain';
import { toGenTerminalObject } from '../converters';

const convert = (
    id: number,
    params: AppendTerminalToProviderParams | CreateTerminalParams
): TerminalObject => ({
    ref: {
        id
    },
    data: {
        name: params.terminalName,
        description: params.terminalDescription,
        risk_coverage: params.riskCoverage,
        options: toMap(params.options)
    }
});

export interface CreateTerminalObject {
    id: number;
    terminalObject: TerminalObject;
}

export const createTerminalObject = (
    terminalObjects: TerminalObject[],
    params: AppendTerminalToProviderParams | CreateTerminalParams
): CreateTerminalObject => {
    const id = generateID(terminalObjects);
    return { terminalObject: toGenTerminalObject(convert(id, params)), id };
};
