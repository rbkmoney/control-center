export function createNextId(ids: number[]) {
    return Math.max(...ids) + 1;
}
