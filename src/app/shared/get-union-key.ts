export function getUnionKeys<T extends object>(obj: T): (keyof T)[] {
    return Object.keys(obj) as any;
}

export function getUnionKeyValue<T extends object>(obj: T): { [K in keyof T]: [K, T[K]] }[keyof T] {
    return Object.entries(obj).find(([k, v]) => v) as any;
}

export function getUnionKey<T extends object>(obj: T) {
    return getUnionKeyValue(obj)[0];
}

export function getUnionValue<T extends object>(obj: T) {
    return getUnionKeyValue(obj)[1];
}
