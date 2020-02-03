import { vfs, fonts } from 'pdfmake/build/pdfmake';

export interface FontsData {
    vfs: typeof vfs;
    fonts: typeof fonts;
}
