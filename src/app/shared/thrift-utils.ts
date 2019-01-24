export function clearNullFields(obj: object): object {
    if (!obj) {
        return;
    }
    const filtered = Object.entries(obj).filter(([, k]) => k !== null);
    let result = {};
    for (const [key, val] of filtered) {
        result = {
            ...result,
            [key]: val
        };
    }
    return result;
}
