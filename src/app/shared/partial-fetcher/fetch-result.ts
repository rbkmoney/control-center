export interface FetchResult<T> {
    result?: T[];
    continuationToken?: string;
    error?: any;
}
