export function cmToIn(cm: number, dpi = 72): number {
    return (cm / 2.54) * dpi;
}
