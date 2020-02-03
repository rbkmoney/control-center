import { cmToIn } from './cm-to-in';

describe('cmToIn', () => {
    it('should convert cm to in', () => {
        const cm = cmToIn(5.08, 72);
        expect(cm).toBe(144);
    });

    it('should convert cm to in with selected dpi', () => {
        const cm = cmToIn(5.08, 100);
        expect(cm).toBe(200);
    });
});
