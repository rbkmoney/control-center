import { Condition } from './condition';

export class Predicate {
    condition?: Condition;
    constant?: boolean;
    isNot?: Predicate;
    allOf?: Set<Predicate>;
    anyOf?: Set<Predicate>;
}
