import {
    Content as PDFMakeContent,
    Style as PDFMakeStyle,
    Table as PDFMakeTable,
    TableCell as PDFMakeTableCell
} from 'pdfmake/build/pdfmake';
import { Replace } from '../shared/type-utils';

type Style = PDFMakeStyle | string | string[];

export type Content = Replace<PDFMakeContent, { style?: Style }>;
export type TableCell = Replace<PDFMakeTableCell, { style?: Style }>;
export type Table = Replace<PDFMakeTable, { body: (Content | PDFMakeTableCell | string)[][] }>;
