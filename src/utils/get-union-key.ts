import get from 'lodash-es/get';
import { ValuesType } from 'utility-types';

export function getUnionKeys<T>(obj: T): (keyof T)[] {
    return obj ? (Object.keys(obj) as any) : [];
}

export function getUnionKeyValue<T>(obj: T): { [K in keyof T]: [K, T[K]] }[keyof T] | null {
    return obj ? (Object.entries(obj).find(([, v]) => v) as any) : null;
}

export function getUnionKey<T>(obj: T): keyof T | null {
    return get(getUnionKeyValue(obj), 0, null);
}

export function getUnionValue<T>(obj: T): ValuesType<T> | null {
    return get(getUnionKeyValue(obj), 1, null);
}
