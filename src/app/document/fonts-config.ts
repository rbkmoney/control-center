import { TFontFamilyTypes } from 'pdfmake/build/pdfmake';

const fontsDir = '/assets/fonts/';
const robotoDir = `${fontsDir}Roboto/`;

export enum FontFamily {
    serif,
    fa
}

export const fontsConfig: { [name in FontFamily]: TFontFamilyTypes } = {
    [FontFamily.serif]: {
        normal: `${robotoDir}Roboto-Regular.ttf`,
        bold: `${robotoDir}Roboto-Bold.ttf`,
        italics: `${robotoDir}Roboto-RegularItalic.ttf`,
        bolditalics: `${robotoDir}Roboto-BoldItalic.ttf`
    },
    [FontFamily.fa]: {
        normal: `${fontsDir}font-awesome5/fa-regular-400.ttf`
    }
};
