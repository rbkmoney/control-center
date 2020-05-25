export const isNumeric = (x): boolean =>
    (typeof x === 'number' || typeof x === 'string') && !isNaN(Number(x));
