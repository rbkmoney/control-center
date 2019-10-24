import { BehaviorSubject, Observable, merge } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { FetchAction, FetchFn, CombineResult, FetchResult } from './model';
import {
    reduceFetchResult,
    takeFetchParams,
    fetch,
    emit,
    mapToResult,
    mapToSearchParams,
    mapToCombineResult,
    mapToContinuationToken,
    filterAction,
    filterEmpty
} from './operators';

export const combineAction = <R, P>(
    action: Observable<FetchAction<P> | null>,
    fetchFn: FetchFn<P, R>
): Observable<CombineResult<R>> => {
    const params = new BehaviorSubject<P>(null);
    const fetchResult = new BehaviorSubject<FetchResult<R>>(null);
    const nonEmptyAction = action.pipe(filterEmpty);
    const search = nonEmptyAction.pipe(
        filterAction('search'),
        mapToSearchParams,
        emit(params),
        takeFetchParams(params),
        fetch(fetchFn)
    );
    const refresh = nonEmptyAction.pipe(
        filterAction('refresh'),
        takeFetchParams(params),
        fetch(fetchFn)
    );
    const continuationToken = fetchResult.pipe(mapToContinuationToken);
    const acc = fetchResult.pipe(mapToResult);
    const more = nonEmptyAction.pipe(
        filterAction('fetchMore'),
        takeFetchParams(params, continuationToken),
        fetch(fetchFn),
        reduceFetchResult(acc)
    );
    return merge(search, refresh, more).pipe(
        emit(fetchResult),
        mapToCombineResult,
        shareReplay(1)
    );
};
