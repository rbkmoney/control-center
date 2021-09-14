export function isChunkLoadError(error: unknown): boolean {
    const message = (error as { message?: string })?.message;
    return (
        !!message &&
        (/Loading chunk [\d]+ failed/.test(message) || /ChunkLoadError [\d]+ failed/.test(message))
    );
}
