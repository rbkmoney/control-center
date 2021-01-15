// TODO: numeric overflow, need logic to use the freed
// TODO: return Int64
export function createNextId(ids: number[]) {
    return Math.max(...ids) + 1;
}
