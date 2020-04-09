import { Terminal, TerminalObject, TerminalRef } from '../damsel/gen-model/domain';
import * as DomainTypes from '../damsel/gen-nodejs/domain_types';

const toGenTerminalRef = (ref: TerminalRef) => {
    const terminalRef = new DomainTypes.TerminalRef();
    terminalRef.id = ref.id;
    return terminalRef;
};

const toGenTerminal = (data: Terminal) => {
    const terminal = new DomainTypes.Terminal();
    terminal.name = data.name;
    terminal.description = data.description;
    terminal.risk_coverage = data.risk_coverage;
    terminal.options = data.options;
    return terminal;
};

export const toGenTerminalObject = (terminal: TerminalObject) => {
    const terminalObjectGen = new DomainTypes.TerminalObject();
    terminalObjectGen.ref = toGenTerminalRef(terminal.ref);
    terminalObjectGen.data = toGenTerminal(terminal.data);
    return terminalObjectGen;
};
