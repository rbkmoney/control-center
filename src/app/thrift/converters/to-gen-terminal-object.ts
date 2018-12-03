import * as DomainTypes from '../gen-nodejs/domain_types';
import { Terminal, TerminalObject, TerminalRef } from '../../damsel/domain';

const toGenTerminalRef = (ref: TerminalRef) => {
    const terminalRef = new DomainTypes.TerminalRef();
    terminalRef.id = ref.id;
    return terminalRef;
};

const toGenTerminal = (data: Terminal) => {
    const terminal = new DomainTypes.Terminal();
    terminal.name = data.name;
    terminal.description = data.description;
    terminal.risk_coverage = data.riskCoverage;
    terminal.options = data.options;
    return terminal;
};

/**
 * @deprecated use metadata.service for create model
 */
export const toGenTerminalObject = (terminal: TerminalObject) => {
    const terminalObjectGen = new DomainTypes.TerminalObject();
    terminalObjectGen.ref = toGenTerminalRef(terminal.ref);
    terminalObjectGen.data = toGenTerminal(terminal.data);
    return terminalObjectGen;
};
