import { Margins, TDocumentHeaderFooterFunction } from 'pdfmake/build/pdfmake';

import { Content } from '../../document';

export function createFooter({
    margin,
    text,
    content
}: {
    margin: Margins;
    text: string;
    content: Content;
}): TDocumentHeaderFooterFunction {
    const lineOffsetIn = 5;
    const lineSizeIn = 100;
    return () => ({
        margin: [margin[0], margin[1] + lineOffsetIn, margin[2], margin[3]],
        columns: [
            [
                content,
                {
                    canvas: [
                        { type: 'line', x1: 0, y1: -lineOffsetIn, x2: lineSizeIn, y2: -lineOffsetIn, lineWidth: 0.5 }
                    ]
                },
                {
                    style: { fontSize: 6 },
                    text
                }
            ]
        ]
    });
}
