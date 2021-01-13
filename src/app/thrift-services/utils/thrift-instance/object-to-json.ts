export function objectToJSON(obj: any): any {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    } else if (obj instanceof Map) {
        return Array.from(obj).map(([k, v]) => [objectToJSON(k), objectToJSON(v)]);
    } else if (obj instanceof Set) {
        return Array.from(obj).map((v) => objectToJSON(v));
    }
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, objectToJSON(v)]));
}
