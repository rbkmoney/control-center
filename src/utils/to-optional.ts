export function toOptional<T extends {}>(obj: T | undefined | null): Partial<T> {
    return obj || {};
}
