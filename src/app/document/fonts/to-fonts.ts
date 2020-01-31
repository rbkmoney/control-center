import { TFontFamilyTypes } from 'pdfmake/build/pdfmake';

import { Font } from './font';

function familyToFonts(familyName: string | number, family: TFontFamilyTypes): Font[] {
    return (Object.entries(family) as [string, string][]).map(([type, url]) => ({
        family: familyName,
        type,
        hash: `${familyName}_${type}`,
        url
    }));
}

export function toFonts(pdfMakeFonts: { [name in string | number]: TFontFamilyTypes }): Font[] {
    return Object.entries(pdfMakeFonts).reduce(
        (accFonts, [familyName, familyFonts]) => accFonts.concat(familyToFonts(familyName, familyFonts)),
        [] as Font[]
    );
}
