import { TableDataSource } from './model';

export function filterPredicate({ stringified }: TableDataSource, filter: string): boolean {
    let regexp;
    try {
        regexp = new RegExp(filter, 'g');
    } catch {
        return false;
    }
    const matched = stringified.match(regexp);
    return matched && matched.length > 0;
}
