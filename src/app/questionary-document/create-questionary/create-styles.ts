import { Style as PDFMakeStyle } from 'pdfmake/build/pdfmake';

import { FontFamily } from '../../document';

export enum Style {}

export function createStyles(): { [name in Style]: PDFMakeStyle } {
    return {};
}

export function createDefaultStyle(): PDFMakeStyle {
    return {
        font: FontFamily.serif,
        fontSize: 8,
        lineHeight: 1
    };
}
