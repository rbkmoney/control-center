import {
    Content as PDFMakeContent,
    Style as PDFMakeStyle,
    Table as PDFMakeTable,
    TableCell as PDFMakeTableCell
} from 'pdfmake/build/pdfmake';
import { Overwrite } from 'utility-types';

type Style = PDFMakeStyle | string | string[];

export type Content = Overwrite<PDFMakeContent, { style?: Style }>;
export type TableCell = Overwrite<PDFMakeTableCell, { style?: Style }>;
export type Table = Overwrite<PDFMakeTable, { body: (Content | PDFMakeTableCell | string)[][] }>;
