import { Table } from '../../../../document';

export function createTableBody(body: Table['body']): Table['body'] {
    /**
     * Магия ✨ таблиц PDFMake (TODO: исправить если что-то изменится)
     * В таблице первая колонка с `colSpan` свойством должна иметь после себя `colSpan - 1` пустых колонок
     * похоже она использует их для расширения первой колонки
     */
    return body.reduce((accBody, row, idx) => {
        const [firstColumn, ...otherColumns] = row;
        if (typeof firstColumn === 'object' && firstColumn.colSpan && firstColumn.colSpan > 1) {
            const firstColumnFiller = new Array(firstColumn.colSpan - 1).fill(null);
            accBody[idx] = [firstColumn, ...firstColumnFiller, ...otherColumns];
        }
        return accBody;
    }, body.slice());
}
