import { cmMarginsToIn } from './cm-margins-to-in';

describe('cmMarginsToIn', () => {
    it('should convert 4 cm margins to in', () => {
        const margins = cmMarginsToIn(5.08, 2.54, 5.08, 7.62);
        expect(margins).toEqual([144, 72, 144, 216]);
    });

    it('should convert 2 cm margins to in', () => {
        const margins = cmMarginsToIn(5.08, 7.62);
        expect(margins).toEqual([144, 216]);
    });

    it('should convert 1 cm margins to in', () => {
        const margins = cmMarginsToIn(7.62);
        expect(margins).toBe(216);
    });
});
