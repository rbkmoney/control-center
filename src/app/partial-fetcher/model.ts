import { Observable } from 'rxjs';

export type FetchFn<P, R> = (params: P, continuationToken: string) => Observable<FetchResult<R>>;

export interface FetchAction<P> {
    type: 'search' | 'refresh' | 'fetchMore';
    value?: P;
}

export interface FetchResult<T> {
    result?: T[];
    continuationToken?: string;
}

export interface CombineResult<T> {
    hasMore: boolean;
    searchResult: T[];
}
