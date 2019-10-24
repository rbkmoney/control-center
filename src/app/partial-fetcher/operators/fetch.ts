import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { FetchResult, FetchFn } from '../model';

export const fetch = <P, R>(fn: FetchFn<P, R>) => (
    s: Observable<[P, string]>
): Observable<FetchResult<R>> =>
    s.pipe(switchMap(([params, continuationToken]) => fn(params, continuationToken)));
