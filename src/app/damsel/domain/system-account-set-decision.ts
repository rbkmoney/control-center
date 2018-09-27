import { Predicate } from './predicate';
import { SystemAccountSetSelector } from './system-account-selector';

export class SystemAccountSetDecision {
    if_: Predicate;
    then_: SystemAccountSetSelector;
}
