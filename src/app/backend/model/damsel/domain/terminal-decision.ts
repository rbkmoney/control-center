import { Predicate } from './predicate';
import { TerminalSelector } from './terminal-selector';

export class TerminalDecision {
    if_: Predicate;
    then_: TerminalSelector;
}
