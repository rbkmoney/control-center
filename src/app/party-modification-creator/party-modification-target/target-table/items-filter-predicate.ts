import { SelectableItem } from './selectable-item';

export const itemsFilterPredicate = (item: SelectableItem, filter: string): boolean =>
    JSON.stringify(item).includes(filter);
