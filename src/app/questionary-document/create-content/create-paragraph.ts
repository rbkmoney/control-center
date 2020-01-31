import { Content, Table, cmMarginsToIn } from '../../document';
import { Layout } from '../create-questionary';
import { createTableBody } from './create-table-body';
import { PRIMARY_COLOR } from '../create-questionary';
import { getColumnsCount } from './get-columns-count';
import { createGrid } from './create-grid';

const MARGIN = cmMarginsToIn(0, 0.1);

function prepareBody(body: Table['body'] | string): Table['body'] {
    body = typeof body === 'string' ? [[body]] : body;
    return body.map(i => i.map(j => j || ''));
}

function setBodyColSpans(body: Table['body'], columnsCount: number): Table['body'] {
    return body.map(row => {
        const rowColumnsCount = row.reduce((sum, col) => sum + (typeof col === 'object' ? col.colSpan || 1 : 1), 0);
        if (rowColumnsCount === columnsCount) {
            return row;
        }
        const lastCol = row[row.length - 1];
        const resultLastCol =
            typeof lastCol === 'object' ? { ...lastCol, colSpan: lastCol.colSpan || 1 } : { text: lastCol, colSpan: 1 };
        resultLastCol.colSpan += columnsCount - rowColumnsCount;
        return [...row.slice(0, -1), resultLastCol];
    });
}

function getColumnsCountByBody(body: Table['body']): number {
    return body.reduce((maxCount, row) => Math.max(maxCount, getColumnsCount(row)), 1);
}

export function createVerticalParagraph(
    header: string,
    body: Table['body'] | string = [[]],
    columnsCount?: number
): Content {
    body = prepareBody(body);
    if (!columnsCount) {
        columnsCount = getColumnsCountByBody(body);
    }
    body = setBodyColSpans(body, columnsCount);
    const headerRow: Table['body'][number] = [
        {
            colSpan: columnsCount,
            style: { color: 'white' },
            text: header
        }
    ];
    return {
        layout: Layout.header,
        margin: MARGIN,
        table: {
            widths: new Array(columnsCount).fill('*'),
            body: createTableBody([headerRow, ...body])
        }
    };
}

export function createInlineParagraph(header: string, body: Table['body'] | string = [[]]): Content {
    body = prepareBody(body);
    const headerTable: Content = {
        layout: Layout.noBorders,
        table: {
            rowSpan: body.length,
            widths: ['*'],
            body: [
                [
                    {
                        text: header,
                        style: { color: 'white' },
                        fillColor: PRIMARY_COLOR
                    }
                ]
            ]
        }
    };
    const bodyTable = {
        layout: Layout.noBorders,
        table: {
            rowSpan: body.length,
            widths: ['*'],
            body
        }
    };
    return { ...createGrid([headerTable, bodyTable]), margin: MARGIN };
}
