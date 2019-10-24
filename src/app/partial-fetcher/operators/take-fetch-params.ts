import { Observable, of, combineLatest } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

export const takeFetchParams = <P>(
    searchParams: Observable<P>,
    continuationToken: Observable<string> = of(null)
) => (s: Observable<any>): Observable<[P, string]> =>
    s.pipe(switchMap(() => combineLatest(searchParams, continuationToken).pipe(take(1))));
