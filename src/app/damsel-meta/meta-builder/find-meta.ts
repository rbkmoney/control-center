import { MetaTypeDefined, MetaTyped, MetaObject } from '../model';
import { MetaTypeCondition, MetaGroup } from './model';

export function findMeta<T extends MetaTypeDefined | MetaTyped | MetaObject>(
    condition: MetaTypeCondition,
    group: MetaGroup[]
): T | null {
    if (!condition || !group) {
        return null;
    }
    const byNamespace = group.find(({ namespace }) => namespace === condition.namespace);
    if (!byNamespace) {
        return null;
    }
    const found = byNamespace.meta.find(({ name }) => name === condition.type) as T;
    return found ? found : null;
}
