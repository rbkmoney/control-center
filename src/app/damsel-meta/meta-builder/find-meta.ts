import { MetaObject, MetaTyped, MetaTypeDefined } from '../model';
import { MetaGroup, MetaTypeCondition } from './model';

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
