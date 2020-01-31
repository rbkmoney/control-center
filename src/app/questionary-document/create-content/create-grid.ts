import { Layout } from '../create-questionary';
import { Content, Table, cmMarginsToIn } from '../../document';
import { createTableBody } from './create-table-body';
import { getColumnsCount } from './get-columns-count';

type Item = Table['body'][number][number] | [Table['body'][number][number], number];

function getMargin(idx: number, count: number, gapCm: number) {
    const marginFirst = cmMarginsToIn(0, 0, gapCm / 2, 0);
    const marginInner = cmMarginsToIn(gapCm / 2, 0, gapCm / 2, 0);
    const marginLast = cmMarginsToIn(gapCm / 2, 0, 0, 0);
    return idx === 0 ? marginFirst : idx === count - 1 ? marginLast : marginInner;
}

function getTableCell(i: Item): Content {
    const [item, colSpan] = Array.isArray(i) ? i : [i, 1];
    const content = typeof item === 'object' ? item : { text: item };
    return { ...content, colSpan };
}

export function createGrid(items: Item[], gapCm: number = 0): Content {
    const row = items.map((i, idx) => ({ ...getTableCell(i), margin: getMargin(idx, items.length, gapCm) }));
    return {
        layout: Layout.wrapper,
        table: {
            widths: new Array(getColumnsCount(row)).fill('*'),
            body: createTableBody([row])
        }
    };
}
