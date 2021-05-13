export function toOptional<T>(obj: T | undefined | null): Partial<T> {
    return obj || {};
}
