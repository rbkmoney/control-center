export enum StatusColor {
    neutral = 'neutral',
    success = 'success',
    pending = 'pending',
    warn = 'warn'
}

export enum PaletteColor {
    primary = 'primary',
    accent = 'accent',
    warn = 'warn'
}

export type Status = keyof typeof StatusColor;
export type Palette = keyof typeof PaletteColor;

export const slateblue400 = '#695BFF';
