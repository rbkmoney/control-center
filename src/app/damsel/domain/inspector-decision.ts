import { Predicate } from './predicate';
import { InspectorSelector } from './inspector-selector';

export class InspectorDecision {
    if_: Predicate;
    then_: InspectorSelector;
}
