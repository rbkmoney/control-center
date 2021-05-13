export function clearNullFields(union: any): any {
    if (!union) {
        return;
    }
    const filtered = Object.entries(union).filter(([, v]) => v !== null);
    let result = {};
    for (const [key, val] of filtered) {
        result = {
            ...result,
            [key]: val,
        };
    }
    return result;
}

export function extract(domainObject: any): any {
    if (!domainObject) {
        return;
    }
    return Object.entries(domainObject).reduce((acc, [, v]) => {
        if (v !== null) {
            return v;
        }
        return acc;
    }, null);
}
