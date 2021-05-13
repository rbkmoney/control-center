import { TableDataSource } from './model';

export function filterPredicate({ stringified }: TableDataSource, filter: string): boolean {
    let regexp;
    try {
        regexp = new RegExp(filter, 'g');
    } catch {
        return false;
    }
    // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
    const matched = stringified.match(regexp);
    return matched && matched.length > 0;
}
