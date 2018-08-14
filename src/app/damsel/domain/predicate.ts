import { Condition } from './condition';

export class Predicate {
    constant?: boolean;
    condition?: Condition;
    isNot?: Predicate;
    allOf?: Set<Predicate>;
    anyOf?: Set<Predicate>;
}
