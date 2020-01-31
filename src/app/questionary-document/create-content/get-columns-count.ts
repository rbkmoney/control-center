import { Table } from '../../document';

export function getColumnsCount(row: Table['body'][number]): number {
    return row.reduce((accCount, col) => accCount + (typeof col === 'object' && col.colSpan ? col.colSpan : 1), 0);
}
