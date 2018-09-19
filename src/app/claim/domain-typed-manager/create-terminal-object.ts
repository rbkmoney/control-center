import { CreateTerminalParams } from './create-terminal-params';
import { generateID, toMap } from './utils';
import { TerminalObject } from '../../damsel/domain';
import { toGenTerminalObject } from '../../thrift/converters';

const convert = (id: number, params: CreateTerminalParams): TerminalObject => ({
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

export const createTerminalObject = (terminalObjects: TerminalObject[], params: CreateTerminalParams): TerminalObject =>
    toGenTerminalObject(convert(generateID(terminalObjects), params));
