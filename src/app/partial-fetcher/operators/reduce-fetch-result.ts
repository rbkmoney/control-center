import { Observable, combineLatest, of } from 'rxjs';
import { switchMap, take, map } from 'rxjs/operators';

import { FetchResult } from '../model';

const toFetchResult = <R>(
    acc: R[],
    { continuationToken, result }: FetchResult<R>
): FetchResult<R> => ({
    continuationToken,
    result: [...acc, ...result]
});

export const reduceFetchResult = <R>(acc: Observable<R[]>) => (
    s: Observable<FetchResult<R>>
): Observable<FetchResult<R>> =>
    s.pipe(
        switchMap(r => combineLatest(acc, of(r)).pipe(take(1))),
        map(([a, r]) => toFetchResult(a, r))
    );
