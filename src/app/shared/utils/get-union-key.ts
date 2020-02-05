import get from 'lodash-es/get';
import { ValuesType } from 'utility-types';

export function getUnionKeys<T extends object>(obj: T): (keyof T)[] {
    return obj ? (Object.keys(obj) as any) : [];
}

export function getUnionKeyValue<T extends object>(
    obj: T
): { [K in keyof T]: [K, T[K]] }[keyof T] | null {
    return obj ? (Object.entries(obj).find(([k, v]) => v) as any) : null;
}

export function getUnionKey<T extends object>(obj: T): keyof T | null {
    return get(getUnionKeyValue(obj), 0, null);
}

export function getUnionValue<T extends object>(obj: T): ValuesType<T> | null {
    return get(getUnionKeyValue(obj), 1, null);
}
