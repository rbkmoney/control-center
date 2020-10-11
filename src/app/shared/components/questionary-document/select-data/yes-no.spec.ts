import { toYesNo, YesNo } from './yes-no';

describe('toYesNo', () => {
    it('null should return -1', () => {
        expect(toYesNo(null)).toBe(-1);
    });

    it('undefined should return -1', () => {
        expect(toYesNo(undefined)).toBe(-1);
    });

    it('true should return yes', () => {
        expect(toYesNo(true)).toBe(YesNo.yes);
    });

    it('false should return no', () => {
        expect(toYesNo(false)).toBe(YesNo.no);
    });
});
