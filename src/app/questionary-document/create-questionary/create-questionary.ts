import { TableLayoutFunctions, TDocumentDefinitions, PageSize } from 'pdfmake/build/pdfmake';

import { createStyles, createDefaultStyle } from './create-styles';
import { createTableLayouts } from './create-table-layouts';
import { DocDef } from './doc-def';
import { cmMarginsToIn } from '../../document/cm-margins-to-in';
import { createFooter } from './create-footer';

export function createQuestionary(data: DocDef): [TDocumentDefinitions, { [name: string]: TableLayoutFunctions }] {
    const leftMarginCm = 3;
    const topMarginCm = 2;
    const rightMarginCm = 1.5;
    const footerMarginCm = 2;

    const pageMarginsIn = cmMarginsToIn(leftMarginCm, topMarginCm, rightMarginCm, footerMarginCm + data.footerHeight);
    const footerMarginsIn = cmMarginsToIn(leftMarginCm, 0, rightMarginCm, 0);

    return [
        {
            pageSize: 'A4' as PageSize,
            pageMargins: pageMarginsIn,
            content: data.content,
            footer: createFooter({ margin: footerMarginsIn, text: data.footer, content: data.prefooter }),
            styles: createStyles(),
            defaultStyle: createDefaultStyle()
        },
        createTableLayouts()
    ];
}
