export function stringify(value: any, space?: string | number): string {
    return JSON.stringify(value, (key: string, val: any) => {
        if (val instanceof Map) {
            return Array.from(val);
        }
        return val;
    }, space);
}
