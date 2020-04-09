import { fonts, vfs } from 'pdfmake/build/pdfmake';

export interface FontsData {
    vfs: typeof vfs;
    fonts: typeof fonts;
}
