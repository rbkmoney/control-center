import { TFontFamilyTypes } from 'pdfmake/build/pdfmake';

import { toFonts } from './to-fonts';

describe('toFonts', () => {
    const fonts: { [name in string | number]: TFontFamilyTypes } = {
        test: {
            normal: 'normal',
            bold: 'bold',
            italics: '🥳',
            bolditalics: 'url5'
        },
        1: {
            normal: 'url'
        }
    };

    it('should return fonts list', () => {
        expect(toFonts(fonts)).toEqual([
            { family: '1', type: 'normal', hash: '1_normal', url: 'url' },
            { family: 'test', type: 'normal', hash: 'test_normal', url: 'normal' },
            { family: 'test', type: 'bold', hash: 'test_bold', url: 'bold' },
            { family: 'test', type: 'italics', hash: 'test_italics', url: '🥳' },
            { family: 'test', type: 'bolditalics', hash: 'test_bolditalics', url: 'url5' }
        ]);
    });
});
