import { Margins } from 'pdfmake/build/pdfmake';

import { cmToIn } from './cm-to-in';

/**
 * left, top, right, bottom
 */
export function cmMarginsToIn(
    ...marginsCm: [number] | [number, number] | [number, number, number, number] | number[]
): Margins {
    const marginsIn = marginsCm.slice(0, 4).map(cm => cmToIn(cm));
    return (marginsIn.length === 1 ? marginsIn[0] : marginsIn) as Margins;
}
