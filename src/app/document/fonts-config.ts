import { TFontFamilyTypes } from 'pdfmake/build/pdfmake';

const FONTS_DIR = '/assets/fonts/';
const ROBOTO_DIR = `${FONTS_DIR}Roboto/`;

export enum FontFamily {
    Serif,
    Fa,
}

export const FONTS_CONFIG: { [name in FontFamily]: TFontFamilyTypes } = {
    [FontFamily.Serif]: {
        normal: `${ROBOTO_DIR}Roboto-Regular.ttf`,
        bold: `${ROBOTO_DIR}Roboto-Bold.ttf`,
        italics: `${ROBOTO_DIR}Roboto-RegularItalic.ttf`,
        bolditalics: `${ROBOTO_DIR}Roboto-BoldItalic.ttf`,
    },
    [FontFamily.Fa]: {
        normal: `${FONTS_DIR}font-awesome5/fa-regular-400.ttf`,
    },
};
